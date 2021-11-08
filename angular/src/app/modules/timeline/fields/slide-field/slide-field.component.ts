import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimelineSlide } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-slide-field',
  templateUrl: './slide-field.component.html',
  styleUrls: ['./slide-field.component.css']
})
export class SlideFieldComponent implements OnInit {

  @Input('title') title : string = ''

  @Input('parentForm') parentForm! : FormGroup 

  @Input('data') data : TimelineSlide | undefined

  @Input('isTitle') isTitle : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
