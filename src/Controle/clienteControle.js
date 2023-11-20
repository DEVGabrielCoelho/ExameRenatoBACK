import CreatePoolConnection from "../config/connection.js";
import sql from "mssql";

export const cadastrarCliente = async (req, res) => {
  try {
    const { nome, endereco, telefone, email } = req.body;

    if (!nome || !endereco || !telefone || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const connection = await CreatePoolConnection();

    const query =
      "INSERT INTO dbo.clientes (nome, endereco, telefone, email) OUTPUT INSERTED.id VALUES (@nome, @endereco, @telefone, @email)";

    const request = connection.request();
    request.input("nome", sql.VarChar, nome);
    request.input("endereco", sql.VarChar, endereco);
    request.input("telefone", sql.VarChar, telefone);
    request.input("email", sql.VarChar, email);

    const result = await request.query(query);

    if (result && result.recordset && result.recordset.length > 0) {
      const insertedId = result.recordset[0].id;
      connection.release();
      return res
        .status(200)
        .json({ message: "Cliente cadastrado com sucesso", insertedId });
    } else {
      connection.release();
      return res.status(500).json({ error: "Erro ao cadastrar cliente" });
    }
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
};

export const listarClientes = async (req, res) => {
  try {
    const connection = await CreatePoolConnection();

    const query = "SELECT * FROM dbo.clientes";
    const request = connection.request();
    const result = await request.query(query);

    connection.release();

    if (result && result.recordset) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ error: "Nenhum cliente encontrado" });
    }
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};
