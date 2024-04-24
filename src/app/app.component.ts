import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {http} from "../config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'conversor-moedas-iuul';

  public getRate = async () => {
    try {
      const rate = await http.get("pair/BRL/USD");
      console.log(rate);
    } catch (e){
      console.log(e);
    }

  }
}
