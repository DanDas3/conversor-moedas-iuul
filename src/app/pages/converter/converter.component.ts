import { Component } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExchangeApiService} from "../../shared/service/exchange-api.service";
import {Sigla} from "../../shared/model/sigla.model";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {ConversaoModel} from "../../shared/model/conversao.model";
import {NgxCurrencyDirective} from "ngx-currency";
import {config} from '../../shared/config';
import {lastValueFrom} from "rxjs";
import {IConversaoExchangeApi} from "../../shared/interfaces/iconversao-exchange-api";

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    NgForOf,
    NgxCurrencyDirective,
    NgIf
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  conversaoForm: FormGroup;
  moedasSuportadas:Sigla[] = [];
  resultado:number = 0;
  taxaCotacao:number = 0;
  constructor(
    private fb:FormBuilder,
    private exchangeApiService: ExchangeApiService,
    private localStorageService: LocalStorageService) {
    this.conversaoForm = this.fb.group({
      valor: [0,[Validators.required, Validators.min(0)]],
      moedaAtual: ['', [Validators.required]],
      moedaDestino: ['',[Validators.required]]

    })
  }
  valor: number = 0;
  moedaAtual: string = '';
  moedaDestino: string = '';

  ngOnInit() {
    this.getMoedasSuportadas();
  }
  async converterValor() {
    const result:IConversaoExchangeApi = await lastValueFrom(this.exchangeApiService.converterValor(this.valor,this.moedaAtual,this.moedaDestino));
    this.resultado = result.conversion_result;
    let conversao: ConversaoModel = new ConversaoModel(
      this.valor,
      result.conversion_result,
      result.base_code,
      result.target_code,
      result.conversion_rate);
    conversao.altaConversao = await this.verificarAltoValor(this.valor,this.moedaAtual, this.moedaDestino, conversao);
    this.taxaCotacao = conversao.taxaCotacao;
    this.localStorageService.adicionarElementoChaveLista('conversoes', conversao);
  }

  getMoedasSuportadas() {
    this.exchangeApiService.getMoedasSuportadas().subscribe((data: any) => {
      data.supported_codes.forEach((item: any) => {
        this.moedasSuportadas.push(new Sigla(item[0], item[1]))
      });
    })
  }

  apenasNumeros(event: any) {
    if(isNaN(event.key)) {
      event.preventDefault();
    }
  }

  private async verificarAltoValor(valor: number, moedaOrigem: string, moedaDestino: string, conversao: ConversaoModel): Promise<boolean> {
    let result: IConversaoExchangeApi;

    if(conversao.moedaOrigem === config.moeda_padrao) {
      result = await lastValueFrom(this.exchangeApiService.converterValor(valor,config.moeda_padrao,conversao.moedaConvertida));
    }
    result = await lastValueFrom(this.exchangeApiService.converterValor(valor,conversao.moedaOrigem,config.moeda_padrao));
    return result.conversion_result >= config.alto_valor;
  }
}
