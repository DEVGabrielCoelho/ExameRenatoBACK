export default class ClienteEntity {
  #id;
  #nome;
  #endereco;
  #telefone;
  #email;

  constructor(id, nome, endereco, telefone, email) {
    this.#id = id;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#telefone = telefone;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    if (novoId !== "") {
      this.#id = novoId;
    }
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    if (novoNome !== "") {
      this.#nome = novoNome;
    }
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    if (novoEndereco !== "") {
      this.#endereco = novoEndereco;
    }
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    if (novoTelefone !== "") {
      this.#telefone = novoTelefone;
    }
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    if (novoEmail !== "") {
      this.#email = novoEmail;
    }
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      endereco: this.#endereco,
      telefone: this.#telefone,
      email: this.#email,
    };
  }
}
