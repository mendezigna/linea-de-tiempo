import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimelineModel } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timelines : TimelineModel[] = []
  constructor(private timelineService : TimelineService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.timelines = await this.timelineService.getAll()
  }

  published() {
    return this.timelines.filter(timeline => timeline.published)
  }

  inProcess() {
    return this.timelines.filter(timeline => !timeline.published)
  }


}
