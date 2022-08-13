import Status from "/Status.js";
import Produto from "/Produto.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerProduto {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.tfID         = this.obterElemento('tfID');
    this.tfNome       = this.obterElemento('tfNome');
    this.tfFabricante = this.obterElemento('tfFabricante');
    this.tfCategoria  = this.obterElemento('tfCategoria');
    this.tfPreco      = this.obterElemento('tfPreco');
      
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  apresentar(pos, qtde, produto) {    
    
    this.configurarNavegacao( pos <= 1 , pos == qtde );   

    if(produto == null) {
      this.tfID.value = "";
      this.tfNome.value      = "";
      this.tfFabricante.value     = "";
      this.tfCategoria.value  = "";
      this.tfPreco.value  = "";
      this.divAviso.innerHTML = " Número de Produtos: 0";
    } else {
      this.tfID.value = produto.getID();
      this.tfNome.value      = produto.getNome();
      this.tfFabricante.value     = produto.getFabricante();
      this.tfCategoria.value  = produto.getCategoria();
      this.tfPreco.value  = produto.getPreco();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Produtos: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.tfID.disabled = false;
      this.tfNome.disabled = false;
      this.tfFabricante.disabled = false;
      this.tfCategoria.disabled = false;
      this.divAviso.innerHTML = "";      
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.tfID.disabled = false;
      this.tfIDvalue = "";
      this.tfFabricante.value = "";
      this.tfNome.value = "";
      this.tfCategoria.value = "";
      this.tfPreco.value = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.tfFabricante.disabled = true;
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 
    this.tfID.disabled = true;
    this.tfNome.disabled = true;
    this.tfFabricante.disabled = true;
    this.tfCategoria.disabled = true;
    this.tfPreco.disabled = true;
  }

}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarPrimeiro();
  
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarProximo();
  
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarAnterior();
  
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarUltimo();
  
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarAlterar();
  
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const id = this.viewer.tfID.value;
  const nome = this.viewer.tfNome.value;
  const fabricante = this.viewer.tfFabricante.value;
  const categoria = this.viewer.tfCategoria.value;
  const preco = this.viewer.tfPreco.value;
    
  // Como defini que o método "efetivar" é um dos métodos incluir, excluir ou alterar
  // não estou precisando colocar os ninhos de IF abaixo.
  this.viewer.getCtrl().efetivar(id, nome, fabricante, categoria, preco); 

}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 
}

//------------------------------------------------------------------------//





