export const criarCliente = async (req, res) => {
  try {
    const { nome, endereco, telefone, email } = req.body;

    if (!nome || !endereco || !telefone || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    await pool.query(
      "INSERT INTO clientes (nome, endereco, telefone, email) VALUES (?, ?, ?, ?)",
      [nome, endereco, telefone, email]
    );

    res.json({ message: "Cliente criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar o cliente:", error);
    res.status(500).json({ error: "Erro ao criar o cliente" });
  }
};

export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, telefone, email } = req.body;

    if (!nome || !endereco || !telefone || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    await pool.query(
      "UPDATE clientes SET nome = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?",
      [nome, endereco, telefone, email, id]
    );

    res.json({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o cliente:", error);
    res.status(500).json({ error: "Erro ao atualizar o cliente" });
  }
};

export const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM clientes WHERE id = ?", [id]);

    res.json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o cliente:", error);
    res.status(500).json({ error: "Erro ao excluir o cliente" });
  }
};

export const listarClientes = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM clientes");

    res.json(results);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};
