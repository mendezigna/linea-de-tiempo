import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'scriptjs';
import { TimelineModel, TimelineSlide } from '../../utils/timeline';
import { Timeline } from '@knight-lab/timelinejs';

import { TimelineService } from '../timeline.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent implements OnInit {

  timeline: TimelineModel = new TimelineModel();
  id: String = "";
  tl: any;
  downloadJsonHref: SafeUrl = {};

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private timelineService: TimelineService, private translate: TranslateService, private sanitizer: DomSanitizer, private _snackBar: MatSnackBar,
    private clipboardApi: ClipboardService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if (!this.id) {
      this.router.navigate(['/error'])
    }
    this.timeline = await this.timelineService.getTimelineView(this.id)
    if(!this.timeline.published){
      this.router.navigate(['/error'])
    } else {
      get('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', () => {
        new Timeline('timeline-embed', this.timeline, { language: this.translate.currentLang })
        
      })

    }

  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.timeline);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  async copyToClipboard() {

    this.clipboardApi.copyFromContent(`<iframe src="http://localhost:4200/timeline/embedded/${this.timeline._id}"> </iframe>`)
    const error = await this.translate.get('TIMELINE.TIMELINEPAGE.COPIED').toPromise()
    const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()
    this._snackBar.open(error, close, { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
  }


  // @Input('timeline')
  // timeline: TimelineModel = new TimelineModel('', '', '', [], '');

  // constructor(config: NgbCarouselConfig, public timelineService : TimelineService) {
  //   config.showNavigationIndicators = false
  //   config.showNavigationArrows = true
  //   config.wrap = false
  // }

  // ngOnInit(): void {
  // }
  // orderEntries() {
  //   const entriesAD = this.timeline.entries.filter(entry => entry.date.ad)
  //     .sort((a, b) => (a.date.day ? a.date.day.valueOf() : 0) - (b.date.day ? b.date.day.valueOf() : 0))
  //     .sort((a, b) => (a.date.month ? a.date.month.valueOf() : 0) - (b.date.month ? b.date.month.valueOf() : 0))
  //     .sort((a, b) => (a.date.year ? a.date.year.valueOf() : 0) - (b.date.year ? b.date.year.valueOf() : 0))
  //   const entriesBC = this.timeline.entries.filter(entry => !entry.date.ad)
  //     .sort((a, b) => (a.date.day ? a.date.day.valueOf() : 0) - (b.date.day ? b.date.day.valueOf() : 0))
  //     .sort((a, b) => (a.date.month ? a.date.month.valueOf() : 0) - (b.date.month ? b.date.month.valueOf() : 0))
  //     .sort((a, b) => (b.date.year ? b.date.year.valueOf() : 0) - (a.date.year ? a.date.year.valueOf() : 0))
  //   return entriesBC.concat(entriesAD)
  // }


  // orderEntriesByDate() {
  //   const entries = this.orderEntries()
  //   const entriesOrderedByDate: { date: string, entries: Entry[] }[] = []
  //   entries.forEach(entry => {
  //     const formated = this.timelineService.dateFormated(entry.date)
  //     const dateForEntry = entriesOrderedByDate.find(dateForEntry => dateForEntry.date == formated)
  //     if (dateForEntry) {
  //       dateForEntry.entries.push(entry)
  //     } else {
  //       entriesOrderedByDate.push({ date: formated, entries: [entry] })
  //     }
  //   })
  //   return entriesOrderedByDate
  // }
}
