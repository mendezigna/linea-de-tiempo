import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimelineDate, TimelineMedia, TimelineSlide, TimelineText } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent {

  public text: TimelineText | undefined = new TimelineText()
  public media : TimelineMedia | undefined = new TimelineMedia()
  public date: TimelineDate = new TimelineDate();
  public form: FormGroup
  public unique_id : string = '0'
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<EntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { entry: TimelineSlide, title: String }) {
    this.form = fb.group({
      slide: fb.group({
        group : [this.data.entry.group],
        display_date: [this.data.entry.display_date],
        background : fb.group({
          url: [this.data.entry.background?.url],
          color: [this.data.entry.background?.color]
        }),
        autolink: [this.data.entry.autolink]
      })
    })
    // this.text = data.entry.text
    // this.media = data.entry.media
    // // this.date = new TimelineDate(data.entry.date?.year, data.entry.date.month, data.entry.date.day, data.entry.date.ce)    
    // this.text = data.entry.text
    // this.unique_id  = data.entry.unique_id!

    // this.form = fb.group({
    //   title: [this.text?.headline],
    //   text: [this.text?.text],
    //   year: [this.date.year, [Validators.required, Validators.min(1)]],
    //   month: [this.date.month, [Validators.min(0), Validators.max(12)]],
    //   day: [this.date.day, [Validators.min(1), Validators.max(31)]],
    //   // ce: [this.date.ce, [Validators.required]],
    //   media: [this.media]
    // }, {
    //   validators: [this.validDate()],
    // });
    
  }
  esBisiesto(year: number): boolean {
    return (year % 400 === 0) ? true : (year % 100 === 0) ? false : year % 4 === 0;

  }

  validDate() {
    return (c: AbstractControl) => {
      const year: number = c.get("year")?.value;
      const month: number = c.get("month")?.value;
      const day: number = c.get("day")?.value;
      const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if ((!this.esBisiesto(year) && month == 2 && day > 28) || day > days[month - 1] || (!month && day) || day < 0) {
        c.get('day')?.setErrors({ invalid: true })
        return { invalid: true }
      } else {
        c.get('day')?.setErrors(null)
        return null
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const errors = this.form.errors;
    if (!this.form.invalid && !errors) {
      const start_date = Object.values(this.form.get('slide.start_date')?.value).every(o => !o) ? undefined : new TimelineDate(this.form.get('slide.start_date.year')?.value || undefined,this.form.get('slide.start_date.month')?.value, this.form.get('slide.start_date.day')?.value, this.form.get('slide.start_date.hour')?.value, this.form.get('slide.start_date.minute')?.value, this.form.get('slide.start_date.second')?.value, this.form.get('slide.start_date.milisecond')?.value, this.form.get('slide.start_date.display_date')?.value, this.form.get('slide.start_date.ad')?.value)
      const end_date_values = Object.values(this.form.get('slide.end_date')?.value)
      end_date_values.splice(Object.values(this.form.get('slide.end_date')?.value).length - 1)
      const end_date = end_date_values.every(o => !o) ? undefined : new TimelineDate(this.form.get('slide.end_date.year')?.value || undefined,this.form.get('slide.end_date.month')?.value, this.form.get('slide.end_date.day')?.value, this.form.get('slide.end_date.hour')?.value, this.form.get('slide.end_date.minute')?.value, this.form.get('slide.end_date.second')?.value, this.form.get('slide.end_date.milisecond')?.value, this.form.get('slide.end_date.display_date')?.value, this.form.get('slide.end_date.ad')?.value)
      const media = Object.values(this.form.get('slide.media')?.value).every(o => !o) ? undefined : new TimelineMedia(this.form.get('slide.media.url')?.value || undefined,this.form.get('slide.media.caption')?.value, this.form.get('slide.media.credit')?.value, this.form.get('slide.media.thumbnail')?.value, this.form.get('slide.media.alt')?.value, this.form.get('slide.media.title')?.value, this.form.get('slide.media.link')?.value, this.form.get('slide.media.link_target')?.value)
      const text = Object.values(this.form.get('slide.text')?.value).every(o => !o) ? undefined : new TimelineText(this.form.get('slide.text.headline')?.value, this.form.get('slide.text.text')?.value)       
      const slide = new TimelineSlide(start_date, end_date, text, media, this.form.get('slide.group')?.value || undefined,this.form.get('slide.display_date')?.value || undefined, Object.values(this.form.get('slide.background')?.value).every(o => !o) ? undefined : {url: this.form.get('slide.background.url')?.value, color : this.form.get('slide.background.color')?.value}, this.form.get('slide.autolink')?.value)
      this.dialogRef.close(slide);
    }

  }
}
