import { Injectable } from '@angular/core';

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

  salvarChaveComoLista(chave:string, valor:any) {
    const chaveLocalStorage = this.lerChave(chave);
    if(!chaveLocalStorage) {
      localStorage.setItem(chave,JSON.stringify([valor]));
      return;
    }
    //
    // chaveLocalStorage.push(valor);
    // localStorage.setItem(chave,JSON.stringify(chaveLocalStorage));
  }

  atualizarChave(chave: string, valor: any) {
    localStorage.setItem(chave,JSON.stringify(valor));
  }

  removerElementoPorIndice(chave: string, index: number) {
    const chaveLocalStorage = this.lerChave(chave);
    if(index >= 0) {
      chaveLocalStorage.splice(index,1);
      this.atualizarChave(chave,chaveLocalStorage);
    }
  }
}
