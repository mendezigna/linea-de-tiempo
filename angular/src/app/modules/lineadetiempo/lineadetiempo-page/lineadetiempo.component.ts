import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LineaDeTiempo, Punto } from '../../utils/LineaDeTiempo';
import { LineaDeTiempoService } from '../lineadetiempo.service';
import { PuntoDialogComponent } from '../punto/punto-dialog/punto-dialog.component';

@Component({
  selector: 'app-lineadetiempo',
  templateUrl: './lineadetiempo.component.html',
  styleUrls: ['./lineadetiempo.component.css']
})
export class LineadetiempoComponent implements OnInit {

  linea: LineaDeTiempo = new LineaDeTiempo();
  id: String = "";
  noExiste: Boolean = false;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,private route: ActivatedRoute, private lineaDeTiempoService: LineaDeTiempoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    this.lineaDeTiempoService.getLineaDeTiempo(this.id).subscribe({
      next: (data) => {
        this.linea = data as LineaDeTiempo
      },
      error: (error) => {
        this.noExiste = true
      }
    })
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(PuntoDialogComponent, {
      width: '35%',
      data: {punto: new Punto(), titulo: "Nuevo Punto"}
    });

    dialogRef.afterClosed().subscribe((result: Punto) => {
      if (result){
        this.linea.puntos.push(result)
      }
    });
  }

  aniadirPunto() {
    this.linea.puntos.push(new Punto())
  }

  eliminarPunto(punto : Punto){
    this.linea.puntos.splice(this.linea.puntos.indexOf(punto), 1)
  }

  modificarPunto(punto : Punto){
    const dialogRef = this.dialog.open(PuntoDialogComponent, {
      width: '35%',
      data: {punto, titulo: "Modificar Punto"},
    });

    dialogRef.afterClosed().subscribe((result: Punto) => {
      if(result){
        punto.fecha = result.fecha
        punto.texto = result.texto
        punto.titulo = result.titulo
      }
    });
  }

  guardarCambios(){
    this.lineaDeTiempoService.guardarCambios(this.linea).subscribe({
      next: (result) => {
        this._snackBar.open('Cambios Guardados con exito', 'cerrar', {duration: 3000});
      },
      error: (err) => {
        this._snackBar.open('Ocurrio un error', 'cerrar',{duration: 3000});
      } 
    })
  }
}
