import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'scriptjs';
import { TimelineModel } from '../../utils/timeline';
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

}
