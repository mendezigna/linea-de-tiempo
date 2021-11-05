import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TimelineDate } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {

  @Input() title : string = ''

  @Input() name : string = 'start_date'

  @Input('parentForm') parentForm! : FormGroup

  @Input('data') data : any 

  @Input('era') era : boolean = false

  @Input('eraIndex') eraIndex : number = 0

  dateControl! : FormGroup
  constructor(private fb : FormBuilder) { 
  }
  
  ngOnInit(): void {

    if(this.data?.data){
      this.data = this.data.data
    }

    this.dateControl = this.fb.group({
      year : [this.data?.year],
      month : [this.data?.month],
      day : [this.data?.day],
      hour : [this.data?.hour],
      minute : [this.data?.minute],
      second : [this.data?.second],
      milisecond : [this.data?.milisecond],   
      display_date : [this.data?.display_date],
    });
    if(this.era){
      ((this.parentForm.get('eras') as FormArray).controls[this.eraIndex] as FormGroup).addControl(this.name, this.dateControl)
    } else {
      (this.parentForm.get('slide')! as FormGroup).addControl(this.name, this.dateControl)

    }
  }

}
