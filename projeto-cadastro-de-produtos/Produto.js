import ModelError from "/ModelError.js";

export default class Produto {
    
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o nome do atributo tem # no início, isso 
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  #id;
  #nome;
  #fabricante;
  #categoria;
  #preco;

  //-----------------------------------------------------------------------------------------//

  constructor(id, nome, fabricante, categoria, preco) {
    this.setID(id);
    this.setNome(nome);
    this.setFabricante(fabricante);
    this.setCategoria(categoria);     
    this.setPreco(preco); 
  }
  
  //-----------------------------------------------------------------------------------------//

  getID() {
    return this.#id;
  }
  
  //-----------------------------------------------------------------------------------------//

  setID(id) {
    if(!Produto.validarID(id))
      throw new ModelError("Matrícula Inválida: " + id);
    this.#id = id;
  }
  
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Produto.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }
  
  
  //-----------------------------------------------------------------------------------------//

  getFabricante() {
    return this.#fabricante;
  }
  
  //-----------------------------------------------------------------------------------------//

  setFabricante(fabricante) {
    if(!Produto.validaFabricante(fabricante))
      throw new ModelError("Fabricante Inválido: " + fabricante);
    this.#fabricante = fabricante;
  }
  
  //-----------------------------------------------------------------------------------------//
  getCategoria() {
    return this.#email;
  }
  
  //-----------------------------------------------------------------------------------------//

  setCategoria(categoria) {
    if(!Produto.validarEmail(categoria))
      throw new ModelError("Categoria inválido: " + categoria);
    this.#categoria = categoria;
  }
  
  //-----------------------------------------------------------------------------------------//

  getTelefone() {
    return this.#telefone;
  }
  
  //-----------------------------------------------------------------------------------------//

  setTelefone(preco) {
    if(!Produto.validarTelefone(preco))
      throw new ModelError("Telefone inválido: " + preco);
    this.#preco = preco;
  }
  
  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return '{' +
               '"id" : "'+ this.#id + '",' +
               '"nome" :  "'     + this.#nome       + '",' +
               '"fabricante" : "'     + this.#fabricante      + '",' +
               '"categoria" : "'    + this.#categoria     + '",' +
               '"preco" : "' + this.#preco  + '" ' + 
           '}';  
  }
  
  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Produto(obj.id, obj.nome, obj.fabricante, obj.categoria, obj.preco);
  }

  //-----------------------------------------------------------------------------------------//
  
  static deassign(obj) { 
    return JSON.parse(obj.toJSON());
  }

  //-----------------------------------------------------------------------------------------//

  static validarID(id) {
    if(id == null || matr == "" || matr == undefined)
      return false;
    if (!padraoMatricula.test(matr))
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    if (nome.length > 40) 
      return false;
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarFabricante(fabricante) {
    if(fabricante == null || fabricante == "" || fabricante == undefined)
      return false;
    if (fabricante.length > 40) 
      return false;
    const padraofabricante = /[A-Z][a-z] */;
    if (!padraofabricante.test(fabricante)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarCategoria(categoria) {
    if(categoria == null || categoria == "" || categoria == undefined)
      return false;
    if (categoria.length > 40) 
      return false;
    const padraoCategoria = /[A-Z][a-z] */;
    if (!padraoCategoria.test(categoria)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarPreco(preco) {
    if(preco == null || preco == "" || preco == undefined)
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "ID: " + this.id + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}