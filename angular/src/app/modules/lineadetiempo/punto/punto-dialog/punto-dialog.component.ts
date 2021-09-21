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
  public fecha: {anho:Number, mes:Number, dia:Number, dc: Boolean} = {anho:2021, mes:1, dia:1, dc: true};

  constructor(public dialogRef: MatDialogRef<PuntoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { punto: Punto, titulo: String }) { 
    this.titulo = data.punto.titulo
    this.fecha = {anho:data.punto.fecha.anho,mes:data.punto.fecha.mes,dia:data.punto.fecha.dia,dc:data.punto.fecha.dc}
    this.texto = data.punto.texto
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  submit(): Punto {
    const newPunto = new Punto()
    newPunto._id = this.data.punto._id ? this.data.punto._id : undefined
    newPunto.fecha= this.fecha
    newPunto.titulo = this.titulo ? this.titulo : "Sin titulo"
    newPunto.texto = this.texto
    return newPunto
  }
}
