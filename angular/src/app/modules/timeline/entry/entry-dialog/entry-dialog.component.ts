import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry, EntryDate } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent {

  public title: string = ''
  public text: string = ''
  public date: EntryDate = new EntryDate(2021, 1, 1, true);
  public form: FormGroup
  public timelineId : string = '0'
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<EntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { entry: Entry, title: String }) {
    this.title = data.entry.title
    this.date = new EntryDate(data.entry.date.year, data.entry.date.month, data.entry.date.day, data.entry.date.ad)    this.text = data.entry.text
    this.timelineId  = data.entry.timelineId

    this.form = fb.group({
      title: [this.title],
      text: [this.text],
      year: [this.date.year, [Validators.required, Validators.min(1)]],
      month: [this.date.month, [Validators.min(0), Validators.max(12)]],
      day: [this.date.day, [Validators.min(1), Validators.max(31)]],
      ad: [this.date.ad, [Validators.required]],
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
      const newEntry = new Entry('', new EntryDate(2021, 1, 1, true), '', '', '0')
      newEntry._id = this.data.entry._id ? this.data.entry._id : undefined
      newEntry.date = this.date
      newEntry.title = this.title ? this.title : "Unknown"
      newEntry.text = this.text
      newEntry.timelineId = this.timelineId

      this.dialogRef.close(newEntry);
    }

  }
}
