import {
  cadastrarCliente,
  listarClientes,
} from "../Controle/clienteControle.js";
import {
  visualizarPedidos,
  excluirPedido,
  cadastrarPedido,
} from "../Controle/pedidoControle.js";

export const clienteManager = {
  cadastrarCliente,
  listarClientes,
};

export const pedidoManager = {
  visualizarPedidos,
  excluirPedido,
  cadastrarPedido,
};
