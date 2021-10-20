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
import { TimelineDialogComponent } from '../timeline-dialog/timeline-dialog.component';
import { DeleteDialogComponent } from '../timeline-dialog/delete-dialog/delete-dialog.component';


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
    private route: ActivatedRoute, public router: Router,
    private timelineService: TimelineService, private translate: TranslateService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timeline = await this.timelineService.getTimeline(this.id)
    get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
      if (this.timeline.entries.length > 0) {
        this.tl = this.createTimelinejs()
      }
    })

  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry: new Entry('', new EntryDate(2021, 1, 1, true), '', '', '', this.timeline.nextId()), title: "NEW" }
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if (result) {
        this.timeline.entries.push(result)
        if (!this.tl) {
          this.tl = this.createTimelinejs()
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
        entry.media = result.media
        entry.timelineId = this.timeline.nextId()
        this.tl.add(entry.toEvent())
        this.tl.removeId(result.timelineId)
      }
    });
  }

  deleteTimeline() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((result: TimelineModel) => {
      if (result) {
        this.timelineService.deleteTimeline(this.timeline._id)
        this.router.navigate(['timeline/dashboard'])
      }
    });
  }

  editTimeline() {
    const dialogRef = this.dialog.open(TimelineDialogComponent, {
      width: '35%',
      data: { timeline: this.timeline, title: "MODIFY" },
    });

    dialogRef.afterClosed().subscribe((result: TimelineModel) => {
      if (result) {
        this.timeline.title = result.title
        this.timeline.category = result.category
        this.timeline.subtitle = result.subtitle
        this.timeline.title = result.title
        this.timeline.media = result.media
        this.tl = this.createTimelinejs()
      }
    });
  }

  publish() {

  }

  saveChanges() {
    this.timelineService.saveChanges(this.timeline)
  }

  createTimelinejs(){
    return new Timeline('timeline-embed', this.timeline.toTimelineJs(), { language: this.translate.currentLang })
  }
}
