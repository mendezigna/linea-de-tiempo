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

  public text: TimelineText = new TimelineText()
  public media : TimelineMedia = new TimelineMedia()
  public date: TimelineDate = new TimelineDate();
  public form: FormGroup
  public unique_id : string = '0'
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<EntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { entry: TimelineSlide, title: String }) {
    this.text = data.entry.text
    this.media = data.entry.media
    // this.date = new TimelineDate(data.entry.date.year, data.entry.date.month, data.entry.date.day, data.entry.date.ce)    
    this.text = data.entry.text
    this.unique_id  = data.entry.unique_id

    this.form = fb.group({
      title: [this.text],
      text: [this.text],
      year: [this.date.year, [Validators.required, Validators.min(1)]],
      month: [this.date.month, [Validators.min(0), Validators.max(12)]],
      day: [this.date.day, [Validators.min(1), Validators.max(31)]],
      // ce: [this.date.ce, [Validators.required]],
      media: [this.media]
    }, {
      validators: [this.validDate()],
    });
    
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
      const newEntry = new TimelineSlide()
      // newEntry.date = new TimelineDate(this.form.get('year')?.value, this.form.get('month')?.value, this.form.get('day')?.value, this.form.get('ce')?.value)
      newEntry.text = this.form.get('text')?.value
      newEntry.media = this.form.get('media')?.value
      newEntry.unique_id = this.unique_id

      this.dialogRef.close(newEntry);
    }

  }
}
