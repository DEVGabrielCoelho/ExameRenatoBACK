export default class PedidoModel {
  #id;
  #dataHora;
  #cliente;
  #status;
  #total;
  #itens;

  constructor(id, dataHora, cliente, status, total) {
    this.#id = id;
    this.#dataHora = dataHora;
    this.#cliente = cliente;
    this.#status = status;
    this.#total = total;
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

  get dataHora() {
    return this.#dataHora;
  }

  set dataHora(novaDataHora) {
    this.#dataHora = novaDataHora;
  }

  get cliente() {
    return this.#cliente;
  }

  set cliente(novoCliente) {
    this.#cliente = novoCliente;
  }

  get status() {
    return this.#status;
  }

  set status(novoStatus) {
    this.#status = novoStatus;
  }

  get total() {
    return this.#total;
  }

  set total(novoTotal) {
    this.#total = novoTotal;
  }

  adicionarItem(item) {
    this.#itens.push(item);
  }

  calcularTotal() {
    this.#total = this.#itens.reduce((total, item) => total + item.total, 0);
  }

  toJSON() {
    return {
      id: this.#id,
      dataHora: this.#dataHora,
      cliente: this.#cliente.toJSON(),
      status: this.#status,
      total: this.#total,
      itens: this.#itens.map((item) => item.toJSON()),
    };
  }
}
