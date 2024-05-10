import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-exclusao-dialog',
  standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './exclusao-dialog.component.html',
  styleUrl: './exclusao-dialog.component.css'
})
export class ExclusaoDialogComponent {
  constructor(public dialogRef: MatDialogRef<ExclusaoDialogComponent>) {
  }
  cancelarHandle() {
    this.dialogRef.close();
  }
}
