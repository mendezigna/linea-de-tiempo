import { TimelineModel, Entry, EntryDate } from './../../utils/timeline';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineService } from '../timeline.service';
import { EntryDialogComponent } from '../entry/entry-dialog/entry-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Timeline } from '@knight-lab/timelinejs';
import { get } from 'scriptjs';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {

  timeline: TimelineModel = new TimelineModel('', '', '', [], '');
  id: String = "";
  tl: any;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private timelineService: TimelineService, private translate: TranslateService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timelineService.getTimeline(this.id).then((timeline) => {
      this.timeline = timeline
      get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
        if (this.timeline.entries.length > 0) {
          this.tl = new Timeline('timeline-embed', this.timeline.toTimelineJs(), {language : this.translate.currentLang})
        }
      })
    }).catch(console.log)

  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry: new Entry('', new EntryDate(2021, 1, 1, true), '', '', this.timeline.nextId()), title: "NEW" }
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if (result) {
        this.timeline.entries.push(result)
        if (!this.tl) {
          this.tl = new Timeline('timeline-embed', this.timeline.toTimelineJs())
        } else {
          this.tl.add(result.toEvent())
        }
      }
    });
  }



  deleteEntry(entry: Entry) {
    this.timeline.entries.splice(this.timeline.entries.indexOf(entry), 1)
    this.tl.removeId(entry.timelineId)
  }

  modifyEntry(entry: Entry) {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry, title: "MODIFY" },
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if (result) {
        entry.date = result.date
        entry.text = result.text
        entry.title = result.title
        entry.timelineId = this.timeline.nextId()
        this.tl.add(entry.toEvent())
        this.tl.removeId(result.timelineId)
      }
    });
  }

  saveChanges() {
    this.timelineService.saveChanges(this.timeline)
  }
}
