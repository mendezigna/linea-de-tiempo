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
  timeline: TimelineModel = new TimelineModel()
  @Input()
  owner : boolean = false
  media : string = 'assets/timeline-logo.png'

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(this.timeline.title && this.timeline.title.media && this.timeline.title.media.url && /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(this.timeline.title.media.url)){
      this.media = this.timeline.title.media.url
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
