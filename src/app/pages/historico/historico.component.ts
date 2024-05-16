import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {ConversaoModel} from "../../shared/model/conversao.model";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialog,
  MatDialogModule,
} from "@angular/material/dialog";
import {ExclusaoDialogComponent} from "../../components/exclusao-dialog/exclusao-dialog.component";
import {NgIf} from "@angular/common";
import {config} from "../../shared/config";

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTableModule, MatPaginatorModule,MatIconModule,MatButtonModule, MatDialogModule, NgIf],
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

  constructor(private localStorageService: LocalStorageService,
              public dialog: MatDialog) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    const dialogExclusaoRef = this.dialog.open(ExclusaoDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogExclusaoRef.afterClosed().subscribe((result) => {
      if (result === true)  this.removerConversao(id)
    })
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

  removerConversao(id:string) {
    this.localStorageService.removerElementoPorIndice(this.chaveLocalStorage, id);
    this.carregarHistorico();
  }

  protected readonly config = config;
}
