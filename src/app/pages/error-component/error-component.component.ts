import { Component } from '@angular/core';
import {
  MatCardModule
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-error-component',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon
  ],
  templateUrl: './error-component.component.html',
  styleUrl: './error-component.component.css'
})
export class ErrorComponentComponent {

}
