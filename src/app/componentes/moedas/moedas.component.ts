import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {ExchangeApiService} from "../../shared/service/exchange-api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Moeda} from "../../shared/model/moeda.model";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
@Component({
  selector: 'app-moedas',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTableModule,MatPaginatorModule],
  templateUrl: './moedas.component.html',
  styleUrl: './moedas.component.css'
})
export class MoedasComponent  implements AfterViewInit{
  moedas:Moeda[] = [];
  displayedColumns = ['sigla', 'descricao'];
  dataSource = new MatTableDataSource<Moeda>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public exchangeApiService: ExchangeApiService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
