import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Punto } from 'src/app/modules/utils/LineaDeTiempo';

@Component({
  selector: 'app-punto-dialog',
  templateUrl: './punto-dialog.component.html',
  styleUrls: ['./punto-dialog.component.css']
})
export class PuntoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PuntoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Punto) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
