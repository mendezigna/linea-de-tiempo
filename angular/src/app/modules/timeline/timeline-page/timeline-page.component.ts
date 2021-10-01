import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Timeline, Entry } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';
import { EntryDialogComponent } from '../entry/entry-dialog/entry-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.css']
})
export class TimelinePageComponent implements OnInit {

  timeline: Timeline = new Timeline();
  id: String = "";

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private router : Router, 
    private timelineService: TimelineService, private translate : TranslateService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    if(!this.id){
      this.router.navigate(['/error'])
    }
    this.timelineService.getTimeline(this.id).subscribe({
      next: (data) => {
        this.timeline = data as Timeline
      },
      error: (error) => {
        this.router.navigate(['/error'])
      }
    })
  }

  newEntry(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: {entry: new Entry(), title: "NEW"}
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if (result){
        this.timeline.entries.push(result)
      }
    });
  }

  addEntry() {
    this.timeline.entries.push(new Entry())
  }

  deleteEntry(entry : Entry){
    this.timeline.entries.splice(this.timeline.entries.indexOf(entry), 1)
  }

  modifyEntry(entry : Entry){
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '35%',
      data: {entry, title: "MODIFY"},
    });

    dialogRef.afterClosed().subscribe((result: Entry) => {
      if(result){
        entry.date = result.date
        entry.text = result.text
        entry.title = result.title
      }
    });
  }

  saveChanges(){
    this.timelineService.saveChanges(this.timeline).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.SUCCESS').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()        
        this._snackBar.open(success, close, {duration: 3000});
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()        
        
        this._snackBar.open(error, close, {duration: 3000});
      } 
    })
  }
}
