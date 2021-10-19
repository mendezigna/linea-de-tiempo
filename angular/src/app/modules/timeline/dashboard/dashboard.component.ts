import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Entry, EntryDate, TimelineModel } from '../../utils/timeline';
import { TimelineDialogComponent } from '../timeline-dialog/timeline-dialog.component';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timelines: TimelineModel[] = []
  constructor(public dialog: MatDialog, private timelineService: TimelineService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.timelines = await this.timelineService.getAll()
  }

  published() {
    return this.timelines.filter(timeline => timeline.published)
  }

  inProcess() {
    return this.timelines.filter(timeline => !timeline.published)
  }

  newTimeline() {
    const date = new EntryDate(1999, 1, 1)
    const entry = new Entry('Entry 1', date, undefined, undefined, undefined)
    const dialogRef = this.dialog.open(TimelineDialogComponent, {
      width: '35%',
      data: {
        timeline: new TimelineModel('', '', 'OTHER', [entry], '', false, '', ''), title: "NEW"
      }
    });

    dialogRef.afterClosed().subscribe((result: TimelineModel) => {
      console.log(result)
      this.timelineService.saveTimeline(result)

    });
  }

}
