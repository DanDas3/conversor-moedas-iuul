import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {ExchangeApiService} from "../../shared/service/exchange-api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Moeda} from "../../shared/model/moeda.model";
@Component({
  selector: 'app-moedas',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTableModule],
  templateUrl: './moedas.component.html',
  styleUrl: './moedas.component.css'
})
export class MoedasComponent {
  moedas:Moeda[] = [];
  displayedColumns = ['sigla', 'descricao'];
    dataSource = new MatTableDataSource<Moeda>([]);
  constructor(public exchangeApiService: ExchangeApiService) {
  }
  ngOnInit() {
    this.getMoedasSuportadas();
  }

  getMoedasSuportadas() {
    this.exchangeApiService.getMoedasSuportadas().subscribe((data:any) => {
      data.supported_codes.forEach((item:any) => {
        this.moedas.push(new Moeda(item[0], item[1]))
      });
      this.dataSource.data = this.moedas;
    })
  }

}
