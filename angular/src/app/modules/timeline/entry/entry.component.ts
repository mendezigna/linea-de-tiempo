import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimelineDate, TimelineModel, TimelineSlide } from '../../utils/timeline';
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

  getDate(){
    return ((this.entry.start_date?.day ? `${this.entry.start_date?.day}/` : "xx/") + (this.entry.start_date?.month ? `${this.entry.start_date?.month}/` : "xx/") + this.entry.start_date?.year) + 
    (this.entry.end_date ? " - " + (this.entry.end_date?.day ? `${this.entry.end_date?.day}/` : "xx/") + (this.entry.end_date?.month ? `${this.entry.end_date?.month}/` : "xx/") + (this.entry.end_date?.year ? `${this.entry.end_date?.year}` : "xx") : "" )
  }
}
