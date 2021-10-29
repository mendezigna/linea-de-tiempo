import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'scriptjs';
import { Timeline } from '@knight-lab/timelinejs';
import { TimelineModel } from '../../utils/timeline';

import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-embedded',
  templateUrl: './embedded.component.html',
  styleUrls: ['./embedded.component.css']
})
export class EmbeddedComponent implements OnInit {

  timeline: TimelineModel = new TimelineModel('', '', '', [], '');
  id: String = "";
  tl: any;
  width : string=''
  height : string=''
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private timelineService: TimelineService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    const params : any = new Object()
    this.route.snapshot.queryParamMap.keys.forEach(param => {
      params[param] = this.route.snapshot.queryParamMap.get(param)
    })
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timeline = await this.timelineService.getTimelineView(this.id)
    if(!this.timeline.published){
      this.router.navigate(['/error'])
    } else {
      get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
        new Timeline('timeline-embed', this.timeline.toTimelineJs(), params)
      })

    }

  }
}
