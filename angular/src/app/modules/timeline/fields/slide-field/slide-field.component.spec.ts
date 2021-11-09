import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MediaFieldComponent } from '../media-field/media-field.component';
import { TextFieldComponent } from '../text-field/text-field.component';

import { SlideFieldComponent } from './slide-field.component';

describe('SlideFieldComponent', () => {
  let component: SlideFieldComponent;
  let fixture: ComponentFixture<SlideFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideFieldComponent, TextFieldComponent, DateFieldComponent, MediaFieldComponent ],
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
    fixture = TestBed.createComponent(SlideFieldComponent);
    component = fixture.componentInstance;
    TestBed.inject(FormBuilder)
    const fb = new FormBuilder()
    const fg = fb.group({})
    fg.addControl('slide', fb.group({
      group : [],
        display_date: [],
        background : fb.group({
          url: [],
          color: []
        }),
        autolink: []
    }))
    component.parentForm = fg
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
