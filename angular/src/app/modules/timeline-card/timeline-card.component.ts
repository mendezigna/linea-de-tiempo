import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimelineModel } from '../utils/timeline';

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css']
})
export class TimelineCardComponent implements OnInit {

  @Input()
  timeline: TimelineModel = new TimelineModel('', '', '', [], '')
  @Input()
  owner : boolean = false

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToTimeline(id : string) {
    if(this.owner){
      this.router.navigate(['/timeline', id])
    } else {
      this.router.navigate(['timeline/view', id])
    }
  }

}
