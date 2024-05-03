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
import {NgForOf} from "@angular/common";
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
    NgxCurrencyDirective
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
      moedaConvertida: ['',[Validators.required]]

    })
  }

  ngOnInit() {
    this.getMoedasSuportadas();
  }
  converterValor() {
    this.exchangeApiService.converterValor(this.conversaoForm?.get('valor')?.value,this.conversaoForm?.get('moedaAtual')?.value,this.conversaoForm?.get('moedaConvertida')?.value).subscribe((data:any) => {
      this.resultado = data.conversion_result;
      let conversao: ConversaoModel = new ConversaoModel(
        this.conversaoForm?.get('valor')?.value,
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

}
