import { TimelineDate, TimelineMedia, TimelineModel, TimelineSlide, TimelineText } from './../../utils/timeline';
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
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {

  timeline: TimelineModel = new TimelineModel();
  id: String = "";
  tl: any;
  downloadJsonHref: SafeUrl = {};
  subscription: Subscription;
  unsavedChanges: boolean = false

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute, public router: Router,
    private timelineService: TimelineService, private translate: TranslateService,
    private sanitizer: DomSanitizer, private _snackBar: MatSnackBar) {
    const source = interval(300000);
    this.subscription = source.subscribe(val => {
      if (this.unsavedChanges) {
        this.saveChanges()
      }
    });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timeline = await this.timelineService.getTimeline(this.id)
    console.log(this.timeline)
    get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
      if (this.timeline.events.length > 0) {
        this.tl = this.createTimelinejs()
      }
    })

  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry: new TimelineSlide(new TimelineDate(), new TimelineDate(), new TimelineText(), new TimelineMedia(), '', '', {url: '', color: ''}, true, this.timeline.nextId()), title: "NEW" }
    });

    dialogRef.afterClosed().subscribe((result: TimelineSlide) => {
      if (result) {
        this.timeline.events.push(result)
        if (!this.tl) {
          this.tl = this.createTimelinejs()
        } else {
          this.tl.add(result)
        }
        this.unsavedChanges = true
      }

    });
  }



  deleteEntry(entry: TimelineSlide) {
    this.timeline.events.splice(this.timeline.events.indexOf(entry), 1)
    this.tl.removeId(entry.unique_id)
    this.unsavedChanges = true
  }

  modifyEntry(entry: TimelineSlide) {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: { entry, title: "MODIFY" },
    });

    dialogRef.afterClosed().subscribe((result: TimelineSlide) => {
      if (result) {
        entry.autolink = result.autolink
        entry.background = result.background
        entry.display_date = result.display_date
        entry.end_date = result.end_date
        entry.group = result.group
        entry.start_date = result.start_date
        entry.text = result.text
        entry.media = result.media
        entry.unique_id = this.timeline.nextId()
        this.tl.add(entry)
        this.tl.removeId(result.unique_id)
        this.unsavedChanges = true
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
        this.timeline.scale = result.scale
        this.timeline.eras = result.eras
        this.tl = this.createTimelinejs()
        this.unsavedChanges = true
      }
    });
  }

  publish() {
    if(!this.unsavedChanges){
      if (!this.timeline.published) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '35%',
        });
  
        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.timeline.published = !this.timeline.published
  
            this.timelineService.publish(this.timeline._id)
          }
        });
      } else {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '35%',
        });
  
        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.timeline.published = !this.timeline.published
            this.timelineService.unpublish(this.timeline._id)
          }
        });
      }

    } else {
      this._snackBar.open('Tienes cambios sin guardar', 'close', { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
    }
  }

  saveChanges() {
    this.timelineService.saveChanges(this.timeline)
    this.unsavedChanges = false
  }

  createTimelinejs() {
    return new Timeline('timeline-embed', this.timeline, { language: this.translate.currentLang })
  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.timeline);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

}
