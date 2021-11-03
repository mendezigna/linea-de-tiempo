import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimelineEra, TimelineMedia, TimelineModel, TimelineSlide } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: './timeline-dialog.component.html',
  styleUrls: ['./timeline-dialog.component.css']
})
export class TimelineDialogComponent implements OnInit {
  file: File | null | undefined = null;
  public form: FormGroup
  title: TimelineSlide;
  scale: string;
  eras : TimelineEra[]
  category: string;
  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<TimelineDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { timeline: TimelineModel, title: String }, public timelineService : TimelineService) {
    this.title = data.timeline.title
    this.scale = data.timeline.scale
    this.category  = data.timeline.category
    this.eras = data.timeline.eras
    this.form = fb.group({
      title: [this.title],
      scale: [this.scale],
      category: [this.category],
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
      const scale = this.form.get('scale')?.value
      const eras = this.form.get('eras')?.value
      const category = this.form.get('category')?.value
      const newTimeline = new TimelineModel(title, this.data.timeline.events, category, this.data.timeline.published , this.data.timeline.owner, scale, eras,this.data.timeline._id )
      this.dialogRef.close(newTimeline);
    }

  }
  handleFileInput(event : Event) {
    const target = event.target as HTMLInputElement;
    this.file = target.files?.item(0)
    let fileReader = new FileReader();
    fileReader.readAsText(this.file!)
    fileReader.onload = (e) => {
      const json = JSON.parse(fileReader.result?.toString()!)
      const newTimeline = new TimelineModel(json.title, json.events || [new TimelineSlide()], json.category || "OTHER", false, '', json.scale)
      this.dialogRef.close(newTimeline);
    }
  }
}
