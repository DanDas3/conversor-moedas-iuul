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
  resultado:string = "0";
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
  valor: string = ''
  moedaAtual: string = '';
  moedaDestino: string = '';

  ngOnInit() {
    this.getMoedasSuportadas();
  }
  converterValor() {
    this.exchangeApiService.converterValor(this.valor,this.moedaAtual,this.moedaDestino).subscribe((data:any) => {
      this.resultado = data.conversion_result;
      let conversao: ConversaoModel = new ConversaoModel(
        this.valor,
        data.conversion_result,
        data.base_code,
        data.target_code,
        data.conversion_rate
        );
      this.localStorageService.adicionarElementoChaveLista('conversoes', conversao);
    })
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
}
