import { Injectable } from '@angular/core';
import {ConversaoModel} from "../model/conversao.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  lerChave (chave:string) {
    const valorLocalStorage = localStorage.getItem(chave);

    if (valorLocalStorage === null) {
      return valorLocalStorage;
    }
    return JSON.parse(valorLocalStorage);
  }

  criarChaveComoLista(chave:string, valor:any) {
    if(!valor) {
      localStorage.setItem(chave,JSON.stringify([]));
      return;
    }
    localStorage.setItem(chave,JSON.stringify([valor]));
  }

  adicionarElementoChaveLista(chave:string, valor:any) {
    const chaveLocalStorage = this.lerChave(chave);
    if(!chaveLocalStorage) {
      this.criarChaveComoLista(chave,valor);
      return;
    }

    chaveLocalStorage.push(valor);
    this.atualizarChave(chave,chaveLocalStorage);
  }

  atualizarChave(chave: string, valor: any) {
    localStorage.setItem(chave,JSON.stringify(valor));
  }

  removerElementoPorIndice(chave: string, id: string) {
    const chaveLocalStorage:ConversaoModel[] = this.lerChave(chave);
    if(id !== '') {
      const index = chaveLocalStorage.findIndex(data => data.id === id)
      chaveLocalStorage.splice(index,1);
      this.atualizarChave(chave,chaveLocalStorage);
    }
  }
}
