import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TimelineDate, TimelineEra, TimelineSlide, TimelineText } from 'src/app/modules/utils/timeline';

@Component({
  selector: 'app-era-field',
  templateUrl: './era-field.component.html',
  styleUrls: ['./era-field.component.css']
})
export class EraFieldComponent implements OnInit {

  @Input('parentForm') parentForm : FormGroup = this.fb.group({})

  @Input('formIndex') formIndex : number = 0

  @Input('data') data : TimelineEra | undefined

  @Output('delete') 
  public delete : EventEmitter<number> = new EventEmitter<number>();

  eraForm! : FormGroup

  constructor(private fb : FormBuilder) { 
  }
  
  ngOnInit(): void {
    this.eraForm = this.fb.group({
    });
    (this.parentForm.get('eras') as FormArray).controls.push(this.eraForm)
  }

  getEraTitle(){
    return (this.parentForm.get('eras') as FormArray).controls[this.formIndex].get('text.headline')?.value
  }

  deleteEra(){
    this.delete.emit(this.formIndex);
  }
}
