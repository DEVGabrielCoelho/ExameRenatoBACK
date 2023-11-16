export const visualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const [pedidoResults] = await pool.query(
      "SELECT * FROM pedidos WHERE id = ?",
      [id]
    );

    if (pedidoResults.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    const pedido = pedidoResults[0];

    const [itensResults] = await pool.query(
      "SELECT * FROM itens_pedido WHERE pedidoId = ?",
      [id]
    );

    const pedidoComItens = {
      id: pedido.id,
      dataHora: pedido.dataHora,
      clienteId: pedido.clienteId,
      status: pedido.status,
      total: pedido.total,
      itensDoPedido: itensResults,
    };

    res.json(pedidoComItens);
  } catch (error) {
    console.error("Erro ao visualizar o pedido:", error);
    res.status(500).json({ error: "Erro ao visualizar o pedido" });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { dataHora, clienteId, status, total } = req.body;

    if (!dataHora || !clienteId || !status || !total) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    await pool.query(
      "UPDATE pedidos SET dataHora = ?, clienteId = ?, status = ?, total = ? WHERE id = ?",
      [dataHora, clienteId, status, total, id]
    );

    res.json({ message: "Pedido atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar o pedido" });
  }
};

export const excluirPedido = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM pedidos WHERE id = ?", [id]);

    res.json({ message: "Pedido excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o pedido:", error);
    res.status(500).json({ error: "Erro ao excluir o pedido" });
  }
};

export const criarPedido = async (req, res) => {
  try {
    const { dataHora, clienteId, status, total, itens } = req.body;

    if (
      !dataHora ||
      !clienteId ||
      !status ||
      !total ||
      !itens ||
      !itens.length
    ) {
      return res.status(400).json({
        error:
          "Todos os campos são obrigatórios, e pelo menos um item deve ser incluído",
      });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    await pool.query(
      "INSERT INTO pedidos (dataHora, clienteId, status, total) VALUES (?, ?, ?, ?)",
      [dataHora, clienteId, status, total]
    );

    const [result] = await connection.query(
      "SELECT LAST_INSERT_ID() as pedidoId"
    );
    const pedidoId = result[0].pedidoId;

    for (const item of itens) {
      const { produto, quantidade, precoUnitario } = item;
      await connection.query(
        "INSERT INTO itens_pedido (pedidoId, produto, quantidade, precoUnitario) VALUES (?, ?, ?, ?)",
        [pedidoId, produto, quantidade, precoUnitario]
      );
    }

    await connection.commit();
    connection.release();

    res.json({ message: "Pedido criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    res.status(500).json({ error: "Erro ao criar o pedido" });
  }
};
