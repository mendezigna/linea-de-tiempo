import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent {

  public title: String = ''
  public text: String = ''
  public date: { year: Number, month: Number, day: Number, ad: Boolean } = { year: 2021, month: 1, day: 1, ad: true };
  public form: FormGroup
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<EntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { entry: Entry, title: String }) {
    this.title = data.entry.title
    this.date = { year: data.entry.date.year, month: data.entry.date.month, day: data.entry.date.day, ad: data.entry.date.ad }
    this.text = data.entry.text
    this.form = fb.group({
      title: [this.title],
      text: [this.text],
      year: [this.date.year, [Validators.required, Validators.min(1)]],
      month: [this.date.month, [Validators.min(0), Validators.max(12)]],
      day: [this.date.day, [Validators.min(1)]],
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
      const dia: number = c.get("dia")?.value;
      const dias = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if ((!this.esBisiesto(year) && month == 2 && dia > 28) || dia > dias[month - 1] || dia > 31 || (!month && dia) || dia < 0) {
        c.get('dia')?.setErrors({ invalid: true })
        return { invalid: true }
      } else {
        c.get('dia')?.setErrors(null)
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
      const newEntry = new Entry()
      newEntry._id = this.data.entry._id ? this.data.entry._id : undefined
      newEntry.date = this.date
      newEntry.title = this.title ? this.title : "Sin title"
      newEntry.text = this.text

      this.dialogRef.close(newEntry);
    }

  }
}
