import { Routes } from '@angular/router';
import {ApresentacaoComponent} from "./pages/apresentacao/apresentacao.component";
import {MoedasComponent} from "./pages/moedas/moedas.component";
import {ConverterComponent} from "./pages/converter/converter.component";
import {HistoricoComponent} from "./pages/historico/historico.component";
import {ErrorComponentComponent} from "./components/error-component/error-component.component";

export const routes: Routes = [
  {path:'', redirectTo:'apresentacao', pathMatch:'full'},
  {path:'apresentacao', component:ApresentacaoComponent},
  {path:'moedas', component:MoedasComponent},
  {path:'conversao', component:ConverterComponent},
  {path:'historico', component:HistoricoComponent},
  {path:'erro', component:ErrorComponentComponent}
];
