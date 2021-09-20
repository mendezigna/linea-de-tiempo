import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Punto } from 'src/app/modules/utils/LineaDeTiempo';

@Component({
  selector: 'app-punto-dialog',
  templateUrl: './punto-dialog.component.html',
  styleUrls: ['./punto-dialog.component.css']
})
export class PuntoDialogComponent {

  public titulo: String = ''
  public texto: String = ''
  public fecha: String = ''

  constructor(public dialogRef: MatDialogRef<PuntoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { punto: Punto, titulo: String }) { 
    this.titulo = data.punto.titulo
    this.fecha = data.punto.fecha
    this.texto = data.punto.texto
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): Punto {
    const newPunto = new Punto()
    newPunto._id = this.data.punto._id
    newPunto.fecha= this.data.punto.fecha
    newPunto.titulo = this.data.punto.titulo ? this.data.punto.titulo : "Sin Titulo" 
    newPunto.texto = this.data.punto.texto
    return newPunto
  }
}
