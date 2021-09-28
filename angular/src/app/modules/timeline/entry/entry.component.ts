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

  @Output('modify') 
  public modify : EventEmitter<Entry> = new EventEmitter<Entry>();

  @Output('delete') 
  public delete : EventEmitter<Entry> = new EventEmitter<Entry>();

  constructor() { }
  ngOnInit(): void {
  }
  modifyEntry() {
    this.modify.emit(this.entry);
  }
  deleteEntry(){
    this.delete.emit(this.entry);
  }
}
