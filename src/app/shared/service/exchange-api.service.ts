import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiConfig} from "../apiConfig";

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {
  httpOptions = {
    header: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getMoedasSuportadas() {
    return this.httpClient.get(`${apiConfig.apiURL}/codes`)
  }

  converterValor(valor:string, moedaAtual:string, moedaConvertida: string) {
    return this.httpClient.get(`${apiConfig.apiURL}/pair/${moedaAtual}/${moedaConvertida}/${valor}`);
  }
}
