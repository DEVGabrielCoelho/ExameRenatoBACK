import express from "express";
import cors from "cors";

import {
  clienteManager,
  pedidoManager,
  itemPedidoManager,
} from "./utils/map.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rotas de Clientes
router.post("/clientes", clienteManager.criarCliente);
router.get("/clientes", clienteManager.listarClientes);
router.put("/clientes/:id", clienteManager.atualizarCliente);
router.delete("/clientes/:id", clienteManager.excluirCliente);

// Rotas de Pedidos
router.post("/pedidos", pedidoManager.criarPedido);
router.get("/pedidos", pedidoManager.listarPedidos);
router.put("/pedidos/:id", pedidoManager.atualizarPedido);
router.delete("/pedidos/:id", pedidoManager.excluirPedido);

// Rotas de Itens do Pedido
router.post("/itens-pedido", itemPedidoManager.criarItemDoPedido);
router.get("/itens-pedido/:pedidoId", itemPedidoManager.listarItensDoPedido);
router.put("/itens-pedido/:id", itemPedidoManager.atualizarItemDoPedido);
router.delete("/itens-pedido/:id", itemPedidoManager.excluirItemDoPedido);

app.listen(port, () => {
  console.log(`Servidor está em execução na porta ${port}`);
});
