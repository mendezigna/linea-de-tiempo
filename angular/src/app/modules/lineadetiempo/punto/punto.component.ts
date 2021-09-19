import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Punto } from '../../utils/LineaDeTiempo';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.component.html',
  styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {

  @Input()
  public punto!: Punto;

  @Output('modificar') 
  public modificar : EventEmitter<Punto> = new EventEmitter<Punto>();

  @Output('eliminar') 
  public eliminar : EventEmitter<Punto> = new EventEmitter<Punto>();

  constructor() { }
  ngOnInit(): void {
  }
  modificarPunto() {
    this.modificar.emit(this.punto);
  }
  eliminarPunto(){
    this.eliminar.emit(this.punto);
  }
}
