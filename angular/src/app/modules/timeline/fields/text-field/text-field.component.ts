import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TimelineText } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  @Input('parentForm') parentForm: FormGroup = this.fb.group({})
  
  @Input('data') data : TimelineText | undefined

  @Input('era') era : boolean = false

  @Input('eraIndex') eraIndex : number = 0

  textControl: FormGroup = this.fb.group({})

  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.textControl = this.fb.group({
      headline: [this.data?.headline],
      text: [this.data?.text],
    });
    if(this.era){
      ((this.parentForm.get('eras') as FormArray).controls[this.eraIndex] as FormGroup).addControl('text',this.textControl)
    } else {
      (this.parentForm.get('slide')! as FormGroup).addControl('text',this.textControl)
    }
  }

}
