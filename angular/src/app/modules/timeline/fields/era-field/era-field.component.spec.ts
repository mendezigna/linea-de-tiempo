import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MaterialModule } from 'src/app/modules/ui/material.module';
import { SharedModule } from 'src/app/shared-module';
import { DateFieldComponent } from '../date-field/date-field.component';
import { TextFieldComponent } from '../text-field/text-field.component';

import { EraFieldComponent } from './era-field.component';

describe('EraFieldComponent', () => {
  let component: EraFieldComponent;
  let fixture: ComponentFixture<EraFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraFieldComponent, DateFieldComponent, TextFieldComponent ],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatExpansionModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EraFieldComponent);
    component = fixture.componentInstance;
    const fg : FormGroup = new FormGroup({})
    fg.addControl('eras', new FormArray([]))
    component.parentForm = fg 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
