import { Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {ApresentacaoComponent} from "./componentes/apresentacao/apresentacao.component";
import {MoedasComponent} from "./componentes/moedas/moedas.component";
import {ConverterComponent} from "./componentes/converter/converter.component";
import {HistoricoComponent} from "./componentes/historico/historico.component";

export const routes: Routes = [
  {path:'', redirectTo:'apresentacao', pathMatch:'full'},
  {path:'apresentacao', component:ApresentacaoComponent},
  {path:'moedas', component:MoedasComponent},
  {path:'conversao', component:ConverterComponent},
  {path:'historico', component:HistoricoComponent}
];
