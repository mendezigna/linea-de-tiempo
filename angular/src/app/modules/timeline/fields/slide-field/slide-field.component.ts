import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-field',
  templateUrl: './slide-field.component.html',
  styleUrls: ['./slide-field.component.css']
})
export class SlideFieldComponent implements OnInit {

  @Input('title') title : string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
