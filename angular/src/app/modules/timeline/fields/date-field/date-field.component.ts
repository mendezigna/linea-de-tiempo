import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {

  @Input() title : string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
