import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ApresentacaoComponent} from "../../../componentes/apresentacao/apresentacao.component";
import {MoedasComponent} from "../../../componentes/moedas/moedas.component";
import {ConverterComponent} from "../../../componentes/converter/converter.component";

@Component({
  selector: 'app-home-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    ApresentacaoComponent,
    MoedasComponent,
    ConverterComponent
  ],
  templateUrl: './home-tabs.component.html',
  styleUrl: './home-tabs.component.css'
})
export class HomeTabsComponent {

}
