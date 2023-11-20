import express from "express";
import cors from "cors";

import { clienteManager, pedidoManager } from "./utils/map.js";

const router = express();
const port = 3000;

router.use(cors("*"));
router.use(express.json());

// Rotas de Clientes
router.post("/clientes", clienteManager.cadastrarCliente);
router.get("/clientes", clienteManager.listarClientes);

// Rotas de Pedidos
router.post("/pedidos", pedidoManager.cadastrarPedido);
router.get("/pedidos", pedidoManager.visualizarPedidos);
router.delete("/pedidos", pedidoManager.excluirPedido);

router.listen(port, () => {
  console.log(`Servidor está em execução na porta ${port}`);
});
