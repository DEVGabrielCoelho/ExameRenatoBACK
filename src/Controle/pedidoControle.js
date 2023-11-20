import CreatePoolConnection from "../config/connection.js";
import sql from "mssql";

export const visualizarPedidos = async (req, res) => {
  try {
    const pedidos = [];
    const connection = await CreatePoolConnection();
    const pedidosResults = await connection.query(
      "SELECT p.id, c.nome as nome FROM pedidos p INNER JOIN clientes c ON c.id = p.clienteId"
    );

    for (const pedido of pedidosResults.recordset) {
      const pedidoComItens = {
        id: pedido.id,
        clienteId: pedido.nome,
        itensDoPedido: [],
      };

      console.log("Valor de pedido.id:", pedido.id);

      const query =
        "SELECT pedidoId, produto, quantidade, precoUnitario FROM itens_pedido WHERE pedidoId = @pedidoId";
      const request = connection.request();
      request.input("pedidoId", sql.Int, pedido.id);

      const itensResults = await request.query(query);

      for (const item of itensResults.recordset) {
        const itemDoPedido = {
          pedidoId: item.pedidoId,
          produto: item.produto,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario,
        };

        pedidoComItens.itensDoPedido.push(itemDoPedido);
      }

      pedidos.push(pedidoComItens);
    }

    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao visualizar os pedidos:", error);
    res.status(500).json({ error: "Erro ao visualizar os pedidos" });
  }
};

export const cadastrarPedido = async (req, res) => {
  try {
    const { clienteId, itens } = req.body;

    if (!clienteId || !itens || !itens.length) {
      return res.status(400).json({
        error:
          "As informações de clienteId e ao menos um item são obrigatórias",
      });
    }

    const connection = await CreatePoolConnection();
    const transaction = new sql.Transaction(connection);

    await transaction.begin();

    const pedidoRequest = new sql.Request(transaction);
    pedidoRequest.input("clienteId", sql.Int, clienteId);

    const pedidoInsertResult = await pedidoRequest.query(
      "INSERT INTO pedidos (clienteId) OUTPUT INSERTED.id VALUES (@clienteId)"
    );

    const pedidoId = pedidoInsertResult.recordset[0].id;

    await transaction.commit();

    const itensTransaction = new sql.Transaction(connection);
    await itensTransaction.begin();

    for (const item of itens) {
      const itensPedidoRequest = new sql.Request(itensTransaction); // Crie uma nova solicitação para cada item
      const { produto, quantidade, precoUnitario } = item;
      itensPedidoRequest.input("pedidoId", sql.Int, pedidoId);
      itensPedidoRequest.input("produto", sql.VarChar, produto);
      itensPedidoRequest.input("quantidade", sql.Int, quantidade);
      itensPedidoRequest.input("precoUnitario", sql.VarChar, precoUnitario);

      await itensPedidoRequest.query(
        "INSERT INTO itens_pedido (pedidoId, produto, quantidade, precoUnitario) VALUES (@pedidoId, @produto, @quantidade, @precoUnitario)"
      );
    }

    await itensTransaction.commit();

    res.json({ message: "Pedido e itens cadastrados com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar o pedido e itens:", error);
    res.status(500).json({ error: "Erro ao cadastrar o pedido e itens" });
  }
};

export const excluirPedido = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await CreatePoolConnection();
    const transaction = new sql.Transaction(connection);

    await transaction.begin();

    // Deletar os itens associados ao pedido
    const deleteItensRequest = new sql.Request(transaction);
    deleteItensRequest.input("id", sql.Int, id);
    await deleteItensRequest.query(
      "DELETE FROM itens_pedido WHERE pedidoId = @id"
    );

    // Deletar o pedido
    const deletePedidoRequest = new sql.Request(transaction);
    deletePedidoRequest.input("id", sql.Int, id);
    await deletePedidoRequest.query("DELETE FROM pedidos WHERE id = @id");

    await transaction.commit();

    res.json({ message: "Pedido e itens excluídos com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o pedido e itens:", error);
    res.status(500).json({ error: "Erro ao excluir o pedido e itens" });
  }
};
