import { Timeline, Entry, EntryDate } from './../../utils/timeline';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineService } from '../timeline.service';
import { EntryDialogComponent } from '../entry/entry-dialog/entry-dialog.component';
import { TranslateService } from '@ngx-translate/core';
const timelinejs = require('@knight-lab/timelinejs')
import '@knight-lab/timelinejs/dist/css/timeline.css';
import { get } from 'scriptjs';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {

  timeline: Timeline = new Timeline('', '', '', [], '');
  id: String = "";
  tl: any;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router,
    private timelineService: TimelineService, private translate: TranslateService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timelineService.getTimeline(this.id).subscribe({
      next: (data) => {
        const datatimeline = data as Timeline
        this.timeline = new Timeline(datatimeline.title, datatimeline.subtitle, datatimeline.category, 
          datatimeline.entries.map((entry, index) => {
            return new Entry(entry.title, new EntryDate(entry.date.year, entry.date.month, entry.date.day, entry.date.ad), entry.text, entry._id, `${index}`)
          }), datatimeline._id)

          console.log(this.timeline.entries)
        get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
          this.tl = new timelinejs.Timeline('timeline-embed', this.timeline.toTimelineJs())
        })
      },
      error: (error) => {
        this.router.navigate(['/error'])
      }
    })

  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry: new Entry('', new EntryDate(2021, 1, 1, true), '', '', `${parseInt(this.timeline.entries[this.timeline.entries.length - 1].timelineId) + 1}`), title: "NEW" }
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      console.log(result)
      if (result) {
        this.timeline.entries.push(result)
        this.tl.add(result.toEvent())
      }
    });
  }

  

  deleteEntry(entry: Entry) {
    this.timeline.entries.splice(this.timeline.entries.indexOf(entry), 1)
    console.log(this.tl.getData(1))
    this.tl.removeId(entry.timelineId)
    console.log(entry)
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
        this.tl.removeId(entry.timelineId)
        this.tl.add(entry.toEvent())
      }
    });
  }

  saveChanges() {
    this.timelineService.saveChanges(this.timeline).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.SUCCESS').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()
        this._snackBar.open(success, close, { duration: 3000 });
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000 });
      }
    })
  }
}
