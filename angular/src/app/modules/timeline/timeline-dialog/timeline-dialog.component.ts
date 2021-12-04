import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimelineDate, TimelineEra, TimelineMedia, TimelineModel, TimelineSlide, TimelineText } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: './timeline-dialog.component.html',
  styleUrls: ['./timeline-dialog.component.css']
})
export class TimelineDialogComponent implements OnInit {
  file: File | null | undefined = null;
  public form!: FormGroup
  title: TimelineSlide | undefined;
  scale: string = 'human';
  eras : TimelineEra[] | undefined
  category: string = 'OTHER';
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<TimelineDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { timeline: TimelineModel, title: String, isTitle: boolean }, public timelineService : TimelineService) {
  }
  
  ngOnInit(): void {
    this.title = this.data.timeline.title
    this.scale = this.data.timeline.scale
    this.category = this.data.timeline.category
    this.eras = this.data.timeline.eras

    this.form = this.fb.group({
      slide: this.fb.group({
        group : [this.title?.group],
        display_date: [this.title?.display_date],
        background : this.fb.group({
          url: [this.title?.background?.url],
          color: [this.title?.background?.color]
        }),
        autolink: [this.title?.autolink]
      }),
      scale: [this.scale],
      eras: this.fb.array([]),
      category: [this.category],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEras(){
    return this.eras
  }

  addEra(){
    if(this.eras){
      this.eras.push(new TimelineEra(new TimelineDate(2020), new TimelineDate(2021), new TimelineText()))
    } else {
      this.eras = [new TimelineEra(new TimelineDate(2020), new TimelineDate(2021), new TimelineText())]

    }
  }

  deleteEra(index: number){
    this.eras?.splice(index, 1);
    (this.form.get('eras') as FormArray).controls.splice(index, 1)
  }

  submit() {
    const errors = this.form.errors;
    if (!this.form.invalid && !errors) {
      const media = Object.values(this.form.get('slide.media')?.value).every(o => !o) ? undefined : Object.assign(new TimelineMedia(), this.form.get('slide.media')?.value)
      const text = Object.values(this.form.get('slide.text')?.value).every(o => !o) ? undefined : Object.assign(new TimelineText(), this.form.get('slide.text')?.value)
      // const media = Object.values(this.form.get('slide.media')?.value).every(o => !o ) ? undefined : new TimelineMedia(this.form.get('slide.media.url')?.value,this.form.get('slide.media.caption')?.value, this.form.get('slide.media.credit')?.value, this.form.get('slide.media.thumbnail')?.value, this.form.get('slide.media.alt')?.value, this.form.get('slide.media.title')?.value, this.form.get('slide.media.link')?.value, this.form.get('slide.media.link_target')?.value)
      // const text = Object.values(this.form.get('slide.text')?.value).every(o => !o ) ? undefined : new TimelineText(this.form.get('slide.text.headline')?.value, this.form.get('slide.text.text')?.value)
      const title = !media && !text ? undefined : new TimelineSlide(undefined, undefined, text, media, this.form.get('slide.group')?.value,this.form.get('slide.display_date')?.value || undefined, {url: this.form.get('slide.background.url')?.value, color : this.form.get('slide.background.color')?.value}, this.form.get('slide.autolink')?.value)
      
      let eras : TimelineEra[] = []
      const scale = this.form.get('scale')?.value
      const erasArrayForm : FormArray = this.form.get('eras') as FormArray
      erasArrayForm.controls.forEach((era) => {
        eras.push(era.value)
      });
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
      const newTimeline = new TimelineModel(json.title, json.events || [new TimelineSlide()], json.category || "OTHER", false,'', json.scale,  json.eras)
      this.dialogRef.close(newTimeline);
    }
  }
}
