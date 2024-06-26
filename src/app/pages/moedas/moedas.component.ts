import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {ExchangeApiService} from "../../shared/service/exchange-api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Sigla} from "../../shared/model/sigla.model";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ErrorTreatment} from "../../shared/ErrorTreatment";
@Component({
  selector: 'app-moedas',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTableModule,MatPaginatorModule],
  templateUrl: './moedas.component.html',
  styleUrl: './moedas.component.css'
})
export class MoedasComponent  implements AfterViewInit{
  moedas:Sigla[] = [];
  displayedColumns = ['sigla', 'descricao'];
  dataSource = new MatTableDataSource<Sigla>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public exchangeApiService: ExchangeApiService,
              private error: ErrorTreatment) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    try {
      this.getMoedasSuportadas();
    }
    catch (e: any) {
      this.error.redirecionar();
    }

  }

  getMoedasSuportadas() {
    this.exchangeApiService.getMoedasSuportadas().subscribe((data:any) => {
      data.supported_codes.forEach((item:any) => {
        this.moedas.push(new Sigla(item[0], item[1]))
      });
      this.dataSource.data = this.moedas;
    })
  }

}
