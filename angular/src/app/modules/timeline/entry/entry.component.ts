import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimelineModel, TimelineSlide } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  @Input() entry: TimelineSlide = new TimelineSlide();

  @Input() timeline: TimelineModel = new TimelineModel();

  @Output('modify') 
  public modify : EventEmitter<TimelineSlide> = new EventEmitter<TimelineSlide>();

  @Output('delete') 
  public delete : EventEmitter<TimelineSlide> = new EventEmitter<TimelineSlide>();

  constructor(public timelineService : TimelineService) { }
  ngOnInit(): void {
  }
  modifyEntry() {
    this.modify.emit(this.entry);
  }
  deleteEntry(){
    this.delete.emit(this.entry);
  }
}
