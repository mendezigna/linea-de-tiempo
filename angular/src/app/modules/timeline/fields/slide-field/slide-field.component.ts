import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimelineSlide } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-slide-field',
  templateUrl: './slide-field.component.html',
  styleUrls: ['./slide-field.component.css']
})
export class SlideFieldComponent implements OnInit {

  @Input('title') title : string = ''

  @Input('parentForm') parentForm : FormGroup = this.fb.group({}) 

  @Input('data') data : TimelineSlide | undefined

  @Input('isTitle') isTitle : boolean = false

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

}
