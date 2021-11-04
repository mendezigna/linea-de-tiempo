import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimelineText } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  @Input('parentForm') parentForm!: FormGroup
  
  @Input('data') data : TimelineText | undefined

  textControl!: FormGroup

  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.textControl = this.fb.group({
      headline: [this.data?.headline],
      text: [this.data?.text],
    });
    (this.parentForm.get('slide')! as FormGroup).addControl('text',this.textControl)
  }

}
