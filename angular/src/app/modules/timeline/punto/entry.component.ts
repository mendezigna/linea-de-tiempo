import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entry } from '../../utils/timeline';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  @Input()
  public entry!: Entry;

  @Output('modificar') 
  public modificar : EventEmitter<Entry> = new EventEmitter<Entry>();

  @Output('eliminar') 
  public eliminar : EventEmitter<Entry> = new EventEmitter<Entry>();

  constructor() { }
  ngOnInit(): void {
  }
  modificarEntry() {
    this.modificar.emit(this.entry);
  }
  eliminarEntry(){
    this.eliminar.emit(this.entry);
  }
}
