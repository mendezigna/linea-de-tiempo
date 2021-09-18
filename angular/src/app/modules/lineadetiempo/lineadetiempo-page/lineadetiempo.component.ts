import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private lineaDeTiempoService: LineaDeTiempoService) { }

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
      data: new Punto()
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
}
