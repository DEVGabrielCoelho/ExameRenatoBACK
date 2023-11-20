export default class PedidoModel {
  #id;
  #clienteId;
  #itens;

  constructor(id, clienteId) {
    this.#id = id;
    this.#clienteId = clienteId;
    this.#itens = [];
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    if (novoId !== "") {
      this.#id = novoId;
    }
  }

  get clienteId() {
    return this.#clienteId;
  }

  set clienteId(novoClienteId) {
    this.#clienteId = novoClienteId;
  }

  toJSON() {
    return {
      id: this.#id,
      clienteId: this.#clienteId,
      itens: this.#itens.map((item) => item.toJSON()),
    };
  }
}
