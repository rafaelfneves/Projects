"use strict";

import ModelError from "/ModelError.js";
import Produto from "/Produto.js";

export default class DaoProduto {
  
  //-----------------------------------------------------------------------------------------//

  static conexao = null;

  constructor() {
    this.arrayProdutos = [];
    this.obterConexao();
  }

  //-----------------------------------------------------------------------------------------//
  
  /*
   *  Devolve uma Promise com a referência para o BD
   */ 
  async obterConexao() {
    if(DaoProduto.conexao == null) {
      DaoProduto.conexao = new Promise(function(resolve, reject) {
        let requestDB = window.indexedDB.open("ProdutoDB", 1); 

        requestDB.onupgradeneeded = (event) => {
          let db = event.target.result;
          let store = db.createObjectStore("ProdutoST", {
            autoIncrement: true
          });
          store.createIndex("idxID", "ID", { unique: true });
        };

        requestDB.onerror = event => {
          reject(new ModelError("Erro: " + event.target.errorCode));
        };

        requestDB.onsuccess = event => {
          if (event.target.result) {
            // event.target.result apontará para IDBDatabase aberto
            resolve(event.target.result);
          }
          else 
            reject(new ModelError("Erro: " + event.target.errorCode));
        };
      });
    }
    return await DaoProduto.conexao;
  }
  
  //-----------------------------------------------------------------------------------------//

  async obterProdutos() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["ProdutoST"], "readonly");
        store = transacao.objectStore("ProdutoST");
        indice = store.index('idxID');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      indice.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Produto.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayProdutos = await promessa;
    return this.arrayAProdutos;
  }

  //-----------------------------------------------------------------------------------------//

  async obterProdutoPelaID(id) {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["ProdutoST"], "readonly");
        store = transacao.objectStore("ProdutoST");
        indice = store.index('idxID');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }

      let consulta = indice.get(id);
      consulta.onsuccess = function(event) { 
        if(consulta.result != null)
          resolve(Produto.assign(consulta.result)); 
        else
          resolve(null);
      };
      consulta.onerror = function(event) { reject(null); };
    });
    let produto = await promessa;
    return produto;
  }

  //-----------------------------------------------------------------------------------------//

  async obterProdutosPeloAutoIncrement() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      try {
        transacao = connection.transaction(["ProdutoST"], "readonly");
        store = transacao.objectStore("ProdutoST");
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Produto.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayProdutos = await promessa;
    return this.arrayProdutos;
  }

  //-----------------------------------------------------------------------------------------//

  async incluir(produto) {
    let connection = await this.obterConexao();      
    let resultado = new Promise( (resolve, reject) => {
      let transacao = connection.transaction(["ProdutoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível incluir o produto", event.target.error));
      };
      let store = transacao.objectStore("ProdutoST");
      let requisicao = store.add(Produto.deassign(produto));
      requisicao.onsuccess = function(event) {
          resolve(true);              
      };
    });
    return await resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(produto) {
    let connection = await this.obterConexao();      
    let resultado = new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["ProdutoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível alterar o produto", event.target.error));
      };
      let store = transacao.objectStore("ProdutoST");     
      let indice = store.index('idxID');
      var keyValue = IDBKeyRange.only(produto.getID());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.id == produto.getID()) {
            const request = cursor.update(Produto.deassign(produto));
            request.onsuccess = () => {
              console.log("[DaoProduto.alterar] Cursor update - Sucesso ");
              resolve("Ok");
              return;
            };
          } 
        } else {
          reject(new ModelError("Produto com a produto " + produto.getID() + " não encontrado!",""));
        }
      };
    });
    return await resultado;
  }
  
  //-----------------------------------------------------------------------------------------//

  async excluir(produto) {
    let connection = await this.obterConexao();      
    let transacao = await new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["ProdutoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível excluir o produto", event.target.error));
      };
      let store = transacao.objectStore("ProdutoST");
      let indice = store.index('idxID');
      var keyValue = IDBKeyRange.only(produto.getID());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.id == produto.getID()) {
            const request = cursor.delete();
            request.onsuccess = () => { 
              resolve("Ok"); 
            };
            return;
          }
        } else {
          reject(new ModelError("Produto não encontrado!"));
        }
      };
    });
    return false;
  }

  //-----------------------------------------------------------------------------------------//
}
