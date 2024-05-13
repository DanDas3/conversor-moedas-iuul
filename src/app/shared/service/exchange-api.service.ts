import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {apiConfig} from "../apiConfig";
import {IConversaoExchangeApi} from "../interfaces/iconversao-exchange-api";
import {ICodigosSuportadosExchangeApi} from "../interfaces/icodigos-suportados-exchange-api";

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
    return this.httpClient.get<ICodigosSuportadosExchangeApi>(`${apiConfig.apiURL}/codes`)
  }

  converterValor(valor:number, moedaAtual:string, moedaDestino: string) {
    return this.httpClient.get<IConversaoExchangeApi>(`${apiConfig.apiURL}/pair/${moedaAtual}/${moedaDestino}/${valor}`);
  }
}
