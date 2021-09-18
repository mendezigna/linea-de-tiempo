import { Component, Input, OnInit } from '@angular/core';
import { Punto } from '../../utils/LineaDeTiempo';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.component.html',
  styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {

  @Input()
  public punto!: Punto;

  constructor() { }
  ngOnInit(): void {
  }

}
