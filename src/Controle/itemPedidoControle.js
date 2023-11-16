export const criarItemDoPedido = async (req, res) => {
  try {
    const { pedidoId, produto, quantidade, precoUnitario } = req.body;

    if (!pedidoId || !produto || !quantidade || !precoUnitario) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    await pool.query(
      "INSERT INTO itens_pedido (pedidoId, produto, quantidade, precoUnitario) VALUES (?, ?, ?, ?)",
      [pedidoId, produto, quantidade, precoUnitario]
    );

    res.json({ message: "Item do pedido criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o item do pedido:", error);
    res.status(500).json({ error: "Erro ao criar o item do pedido" });
  }
};

export const listarItensDoPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const [results] = await pool.query(
      "SELECT * FROM itens_pedido WHERE pedidoId = ?",
      [pedidoId]
    );

    res.json(results);
  } catch (error) {
    console.error("Erro ao listar itens do pedido:", error);
    res.status(500).json({ error: "Erro ao listar itens do pedido" });
  }
};

export const atualizarItemDoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { pedidoId, produto, quantidade, precoUnitario } = req.body;

    if (!pedidoId || !produto || !quantidade || !precoUnitario) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    await pool.query(
      "UPDATE itens_pedido SET pedidoId = ?, produto = ?, quantidade = ?, precoUnitario = ? WHERE id = ?",
      [pedidoId, produto, quantidade, precoUnitario, id]
    );

    res.json({ message: "Item do pedido atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o item do pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar o item do pedido" });
  }
};

export const excluirItemDoPedido = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM itens_pedido WHERE id = ?", [id]);

    res.json({ message: "Item do pedido excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o item do pedido:", error);
    res.status(500).json({ error: "Erro ao excluir o item do pedido" });
  }
};
