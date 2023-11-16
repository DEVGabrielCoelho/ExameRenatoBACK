export default class ItemDoPedidoModel {
  #id;
  #produto;
  #quantidade;
  #precoUnitario;

  constructor(id, produto, quantidade, precoUnitario) {
    this.#id = id;
    this.#produto = produto;
    this.#quantidade = quantidade;
    this.#precoUnitario = precoUnitario;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    if (novoId !== "") {
      this.#id = novoId;
    }
  }

  get produto() {
    return this.#produto;
  }

  set produto(novoProduto) {
    if (novoProduto !== "") {
      this.#produto = novoProduto;
    }
  }

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(novaQuantidade) {
    this.#quantidade = novaQuantidade;
  }

  get precoUnitario() {
    return this.#precoUnitario;
  }

  set precoUnitario(novoPrecoUnitario) {
    this.#precoUnitario = novoPrecoUnitario;
  }

  toJSON() {
    return {
      id: this.#id,
      produto: this.#produto,
      quantidade: this.#quantidade,
      precoUnitario: this.#precoUnitario,
      total: this.#quantidade * this.#precoUnitario,
    };
  }
}
