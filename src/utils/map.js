import {
  criarCliente,
  atualizarCliente,
  listarClientes,
  excluirCliente,
} from "../Controle/clienteControle.js";
import {
  excluirItemDoPedido,
  atualizarItemDoPedido,
  listarItensDoPedido,
  criarItemDoPedido,
} from "../Controle/itemPedidoControle.js";
import {
  listarPedidos,
  atualizarPedido,
  excluirPedido,
  criarPedido,
} from "../Controle/pedidoControle.js";

export const clienteManager = {
  criarCliente,
  atualizarCliente,
  listarClientes,
  excluirCliente,
};
export const itemPedidoManager = {
  excluirItemDoPedido,
  atualizarItemDoPedido,
  listarItensDoPedido,
  criarItemDoPedido,
};
export const pedidoManager = {
  listarPedidos,
  atualizarPedido,
  excluirPedido,
  criarPedido,
};
