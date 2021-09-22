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

  fechasPorPuntos: Map<string, Punto[]> = new Map()

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = false
    config.showNavigationArrows = true
    config.wrap = false
  }

  ngOnInit(): void {
  }
  puntosOrdenados() {
    const puntosDC = this.lineaDeTiempo.puntos.filter(punto => punto.fecha.dc)
      .sort((a, b) => (a.fecha.dia ? a.fecha.dia.valueOf() : 0) - (b.fecha.dia ? a.fecha.dia.valueOf() : 0))
      .sort((a, b) => (a.fecha.mes ? a.fecha.mes.valueOf() : 0) - (b.fecha.mes ? a.fecha.mes.valueOf() : 0))
      .sort((a, b) => (a.fecha.anho ? a.fecha.anho.valueOf() : 0) - (b.fecha.anho ? b.fecha.anho.valueOf() : 0))
    const puntosAC = this.lineaDeTiempo.puntos.filter(punto => !punto.fecha.dc)
      .sort((a, b) => (a.fecha.dia ? a.fecha.dia.valueOf() : 0) - (b.fecha.dia ? a.fecha.dia.valueOf() : 0))
      .sort((a, b) => (a.fecha.mes ? a.fecha.mes.valueOf() : 0) - (b.fecha.mes ? a.fecha.mes.valueOf() : 0))
      .sort((a, b) => (b.fecha.anho ? b.fecha.anho.valueOf() : 0) - (a.fecha.anho ? a.fecha.anho.valueOf() : 0))
    return puntosAC.concat(puntosDC)
  }

  fechaFormateada(fecha: Fecha) {
    const anho = fecha.anho
    const mes = fecha.mes ? fecha.mes : "XX"
    const dia = fecha.dia ? fecha.dia : "XX"
    const dc = fecha.dc ? "DC" : "AC"

    return `${anho} - ${mes} - ${dia} ${dc}`
  }


  irAPunto(punto: Punto) {

  }

  puntosPorFecha() {
    const puntos = this.puntosOrdenados()
    const fechasPorPuntos: { fecha: string, puntos: Punto[] }[] = []
    puntos.forEach(punto => {
      const formateada = this.fechaFormateada(punto.fecha)
      const fechaPorPunto = fechasPorPuntos.find(fechaPorPunto => fechaPorPunto.fecha == formateada)
      if (fechaPorPunto) {
        fechaPorPunto.puntos.push(punto)
      } else {
        fechasPorPuntos.push({ fecha: formateada, puntos: [punto] })
      }
    })
    return fechasPorPuntos
  }
}
