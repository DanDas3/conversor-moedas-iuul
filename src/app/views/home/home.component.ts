import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeTabsComponent} from "./home-tabs/home-tabs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,HomeTabsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
