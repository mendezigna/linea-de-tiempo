import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-era-field',
  templateUrl: './era-field.component.html',
  styleUrls: ['./era-field.component.css']
})
export class EraFieldComponent implements OnInit {

  @Input('parentForm') parentForm! : FormGroup


  constructor() { }

  ngOnInit(): void {
  }

}
