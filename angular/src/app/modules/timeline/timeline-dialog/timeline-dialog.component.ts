import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimelineModel } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: './timeline-dialog.component.html',
  styleUrls: ['./timeline-dialog.component.css']
})
export class TimelineDialogComponent implements OnInit {

  public form: FormGroup
  title: string;
  subtitle: string;
  media : string;
  category: string;
  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<TimelineDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { timeline: TimelineModel, title: String }, public timelineService : TimelineService) {
    this.title = data.timeline.title
    this.media = data.timeline.media
    this.subtitle = data.timeline.subtitle
    this.category  = data.timeline.category
    
    this.form = fb.group({
      title: [this.title],
      subtitle: [this.subtitle],
      category: [this.category],
      media: [this.media]
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const errors = this.form.errors;
    if (!this.form.invalid && !errors) {
      const title = this.form.get('title')?.value
      const subtitle = this.form.get('subtitle')?.value
      const media = this.form.get('media')?.value
      const category = this.form.get('category')?.value
      const newTimeline = new TimelineModel(title, subtitle, category, this.data.timeline.entries, this.data.timeline._id, this.data.timeline.published, this.data.timeline.owner, media)
      this.dialogRef.close(newTimeline);
    }

  }
}
