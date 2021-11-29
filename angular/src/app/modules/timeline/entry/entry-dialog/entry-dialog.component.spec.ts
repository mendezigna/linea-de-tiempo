import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/ui/material.module';
import { SharedModule } from 'src/app/shared-module';
import { TimelineService } from '../../timeline.service';

import { EntryDialogComponent } from './entry-dialog.component';
import { TimelineDate, TimelineSlide } from 'src/app/modules/utils/timeline';
import { SlideFieldComponent } from '../../fields/slide-field/slide-field.component';
import { MediaFieldComponent } from '../../fields/media-field/media-field.component';
import { TextFieldComponent } from '../../fields/text-field/text-field.component';
import { DateFieldComponent } from '../../fields/date-field/date-field.component';

describe('EntryDialogComponent', () => {
  let component: EntryDialogComponent;
  let fixture: ComponentFixture<EntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryDialogComponent, SlideFieldComponent, MediaFieldComponent, TextFieldComponent, DateFieldComponent],
      providers: [
        TimelineService,
        { provide: MatDialogRef, useValue: { close: (entry: TimelineSlide) => { } } }, { provide: MAT_DIALOG_DATA, useValue: { title: "title", entry: new TimelineSlide(new TimelineDate(2021)) } }
      ],
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
        MatIconModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryDialogComponent);
    TestBed.inject(FormBuilder)
    TestBed.inject(MatDialog)  
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on no click', () => {
    const spyDialog = spyOn(component.dialogRef, 'close')
    component.onNoClick()
    expect(spyDialog.calls.count()).toBe(1)
  })

  it('submit', () => {
    const spyDialog = spyOn(component.dialogRef, 'close')
    component.submit()
    expect(spyDialog.calls.count()).toBe(1)
  })
});
