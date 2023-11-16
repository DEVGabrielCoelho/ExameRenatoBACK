import { createConnection } from "mysql2";

export default connection = createConnection({
  host: "localhost", // Endereço do servidor MySQL
  user: "seu_usuario", // Nome de usuário do MySQL
  password: "sua_senha", // Senha do MySQL
  database: "seu_banco_de_dados", // Nome do banco de dados
});
