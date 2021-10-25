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
  media : string = 'assets/timeline-logo.png'

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.timeline.media)){
      this.media = this.timeline.media
    }
  }

  goToTimeline(id : string) {
    if(this.owner){
      this.router.navigate(['/timeline', id])
    } else {
      this.router.navigate(['timeline/view', id])
    }
  }

}
