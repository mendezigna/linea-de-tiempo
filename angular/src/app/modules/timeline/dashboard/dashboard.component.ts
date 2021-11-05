import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TimelineDate, TimelineModel, TimelineSlide, TimelineText } from '../../utils/timeline';
import { TimelineDialogComponent } from '../timeline-dialog/timeline-dialog.component';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timelines: TimelineModel[] = []
  constructor(public dialog: MatDialog, private timelineService: TimelineService) { }

  ngOnInit() {
    this.timelineService.getAll().then(timelines => {
      this.timelines = timelines
    })
  }

  published() {
    return this.timelines.filter(timeline => timeline.published)
  }

  inProcess() {
    return this.timelines.filter(timeline => !timeline.published)
  }

  async newTimeline() {
    const date = new TimelineDate(2021)
    const newEntryTitle = await this.timelineService.getNewEntryTitle()
    const entry = new TimelineSlide(date, date, new TimelineText(newEntryTitle))
    const dialogRef = this.dialog.open(TimelineDialogComponent, {
      width: '75%',
      data: {
        timeline: new TimelineModel(new TimelineSlide(), [entry]), title: "NEW"
      }
    });

    dialogRef.afterClosed().subscribe((result: TimelineModel) => {
      if (result) {
        console.log('result', result)
        this.timelineService.saveTimeline(result)
      }
    });
  }

}
