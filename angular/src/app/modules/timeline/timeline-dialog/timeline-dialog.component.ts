import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public form: FormGroup
  title: TimelineSlide | undefined;
  scale: string;
  eras : TimelineEra[] | undefined
  category: string;
  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<TimelineDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { timeline: TimelineModel, title: String }, public timelineService : TimelineService) {
    this.title = data.timeline.title
    this.scale = data.timeline.scale
    this.category = data.timeline.category
    this.eras = data.timeline.eras

    this.form = fb.group({
      slide: fb.group({
        // start_date: fb.group({
        //   year : [this.title?.start_date?.year],
        //   month : [this.title?.start_date?.month],
        //   day : [this.title?.start_date?.day],
        //   hour : [this.title?.start_date?.hour],
        //   minute : [this.title?.start_date?.minute],
        //   second : [this.title?.start_date?.second],
        //   milisecond : [this.title?.start_date?.milisecond],   
        //   display_date : [this.title?.start_date?.display_date],
        // }),
        // end_date: fb.group({
        //   year : [this.title?.end_date?.year],
        //   month : [this.title?.end_date?.month],
        //   day : [this.title?.end_date?.day],
        //   hour : [this.title?.end_date?.hour],
        //   minute : [this.title?.end_date?.minute],
        //   second : [this.title?.end_date?.second],
        //   milisecond : [this.title?.end_date?.milisecond],   
        //   display_date : [this.title?.end_date?.display_date],
          
        // }),
        // text: fb.group({
        //   headline : [this.title?.text?.headline], 
        //   text : [this.title?.text?.text], 
        // }),
        // media: fb.group({
        //   url: [this.title?.media?.url],
        //   caption: [this.title?.media?.caption],
        //   credit: [this.title?.media?.credit],
        //   thumbnail:  [this.title?.media?.thumbnail],
        //   alt: [this.title?.media?.alt],
        //   title: [this.title?.media?.title],
        //   link: [this.title?.media?.link],
        //   link_target: [this.title?.media?.link_target],
        // }),
        group : [this.title?.group],
        display_date: [this.title?.display_date],
        background : fb.group({
          url: [this.title?.background.url],
          color: [this.title?.background.color]
        }),
        autolink: [this.title?.autolink]
      }),
      scale: [this.scale],
      eras: fb.array(this.eras ? this.eras : []),
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
      const start_date = Object.values(this.form.get('slide.start_date')?.value).every(o => o === null) ? undefined : new TimelineDate(this.form.get('slide.start_date.year')?.value || undefined,this.form.get('slide.start_date.month')?.value, this.form.get('slide.start_date.day')?.value, this.form.get('slide.start_date.hour')?.value, this.form.get('slide.start_date.minute')?.value, this.form.get('slide.start_date.second')?.value, this.form.get('slide.start_date.milisecond')?.value, this.form.get('slide.start_date.display_date')?.value)
      console.log(this.form.get('slide.start_date')?.value)
      const end_date = Object.values(this.form.get('slide.end_date')?.value).every(o => o === null) ? undefined : new TimelineDate(this.form.get('slide.end_date.year')?.value || undefined,this.form.get('slide.end_date.month')?.value, this.form.get('slide.end_date.day')?.value, this.form.get('slide.end_date.hour')?.value, this.form.get('slide.end_date.minute')?.value, this.form.get('slide.end_date.second')?.value, this.form.get('slide.end_date.milisecond')?.value, this.form.get('slide.end_date.display_date')?.value)
      const media = Object.values(this.form.get('slide.media')?.value).every(o => o === null) ? undefined : new TimelineMedia(this.form.get('slide.media.url')?.value || undefined,this.form.get('slide.media.caption')?.value, this.form.get('slide.media.credit')?.value, this.form.get('slide.media.thumbnail')?.value, this.form.get('slide.media.alt')?.value, this.form.get('slide.media.title')?.value, this.form.get('slide.media.link')?.value, this.form.get('slide.media.link_target')?.value)
      const text = Object.values(this.form.get('slide.text')?.value).every(o => o === null) ? undefined : new TimelineText(this.form.get('slide.text.headline')?.value, this.form.get('slide.text.text')?.value)
      const title = new TimelineSlide(start_date, end_date, text, media, this.form.get('slide.group')?.value,this.form.get('slide.display_date')?.value || undefined, {url: this.form.get('slide.background.url')?.value, color : this.form.get('slide.background.color')?.value}, this.form.get('slide.autolink')?.value)
      
      const scale = this.form.get('scale')?.value
      const eras = this.form.get('eras')?.value
      const category = this.form.get('category')?.value
      const newTimeline = new TimelineModel(title, this.data.timeline.events, category, this.data.timeline.published , this.data.timeline.owner, scale, eras,this.data.timeline._id )
      console.log(newTimeline)
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
