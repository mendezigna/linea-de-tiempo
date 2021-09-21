import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Fecha, LineaDeTiempo, Punto } from '../../utils/LineaDeTiempo';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css'],
})
export class VisualizacionComponent implements OnInit {

  @Input('linea-de-tiempo')
  lineaDeTiempo!: LineaDeTiempo;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = false
    config.showNavigationArrows = true
    config.wrap = false
  }

  ngOnInit(): void {
  }
  puntosOrdenados() {
    const puntosDC = this.lineaDeTiempo.puntos.filter(punto => punto.fecha.dc)
      .sort((a, b) => (a.fecha.dia.valueOf()) - (b.fecha.dia.valueOf()))
      .sort((a, b) => (a.fecha.mes.valueOf()) - (b.fecha.mes.valueOf()))
      .sort((a, b) => (a.fecha.anho.valueOf()) - (b.fecha.anho.valueOf()))
    const puntosAC = this.lineaDeTiempo.puntos.filter(punto => !punto.fecha.dc)
      .sort((a, b) => (a.fecha.dia.valueOf()) - (b.fecha.dia.valueOf()))
      .sort((a, b) => (a.fecha.mes.valueOf()) - (b.fecha.mes.valueOf()))
      .sort((a, b) => (b.fecha.anho.valueOf()) - (a.fecha.anho.valueOf()))
    return puntosAC.concat(puntosDC)
  }

  fechaFormateada(fecha : Fecha) {
    const anho = fecha.anho
    const mes = fecha.mes ? fecha.mes : "XX" 
    const dia = fecha.dia ? fecha.dia : "XX" 
    const dc = fecha.dc ? "DC" : "AC" 

    return `${anho} - ${mes} - ${dia} ${dc}`
  }

}
