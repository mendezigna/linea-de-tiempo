import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private timelineService: TimelineService, private translate: TranslateService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timeline = await this.timelineService.getTimeline(this.id)
    if(!this.timeline.published){
      this.router.navigate(['/error'])
    } else {
      get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
        new Timeline('timeline-embed', this.timeline.toTimelineJs(), { language: this.translate.currentLang })
        
      })

    }

  }
}
