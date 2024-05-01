import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {ConversaoModel} from "../../shared/model/conversao.model";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements AfterViewInit {
  historicoConversoes:ConversaoModel[] = [];
  displayedColumns = ['dataConversao',
    'horaConversao',
    'valor',
    'valorConvertido',
    'moedaOrigem',
    'moedaConvertida',
    'taxaCotacao', 'acao'];
  dataSource = new MatTableDataSource<ConversaoModel>([]);
  chaveLocalStorage: string = 'conversoes'
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    this.historicoConversoes = this.localStorageService.lerChave(this.chaveLocalStorage)
    this.dataSource.data = this.historicoConversoes;

  }

  formatarData(data:Date) {
    const dataAuxiliar: Date = this.converterDataParaTimeZone(data,'pt-BR', 'UTC');
    const mes = dataAuxiliar.getMonth() + 1;

    return `${dataAuxiliar.getDate()}/${mes}/${dataAuxiliar.getFullYear()}`;
  }

  formatarHora(data:Date) {
    const dataAuxiliar: Date = this.converterDataParaTimeZone(data,'pt-BR', 'UTC');
    return `${dataAuxiliar.getHours()}:${dataAuxiliar.getMinutes()}:${dataAuxiliar.getSeconds()}`;
  }

  private converterDataParaTimeZone(data:Date, locale:string, timeZone:string) {
    return new Date(data.toLocaleString(locale, { timeZone: timeZone }));
  }

  removerConversao(index:number) {
    console.log('remover', index);
    this.localStorageService.removerElementoPorIndice(this.chaveLocalStorage, index);
    this.carregarHistorico();
  }
}
