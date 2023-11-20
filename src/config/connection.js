import sql from "mssql";

let poolConnection;

export default async function CreatePoolConnection() {
  if (global.poolConnections) {
    return await global.poolConnections.connect();
  }

  try {
    poolConnection = await sql.connect({
      user: "local",
      password: "local",
      server: "127.0.0.1",
      database: "backend",
      port: 1433,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    global.poolConnections = poolConnection;

    console.log("Conexão bem-sucedida ao SQL Server!");

    return poolConnection;
  } catch (error) {
    console.error("Erro ao conectar ao SQL Server:", error);
    throw new Error("Erro ao conectar ao SQL Server");
  }
}
