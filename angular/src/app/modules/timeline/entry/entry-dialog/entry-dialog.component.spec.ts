import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Entry, EntryDate } from 'src/app/modules/utils/timeline';
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

describe('EntryDialogComponent', () => {
  let component: EntryDialogComponent;
  let fixture: ComponentFixture<EntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryDialogComponent],
      providers: [
        TimelineService,
        { provide: MatDialogRef, useValue: { close: (entry: Entry) => { } } }, { provide: MAT_DIALOG_DATA, useValue: { title: "title", entry: new Entry('',new EntryDate(2021, 2, 2, true),'', '', '') } }
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

  it('es bisiesto', () => {
    expect(component.esBisiesto(400)).toBe(true)
  })

  it('no es bisiesto', () => {
    expect(component.esBisiesto(401)).toBe(false)
  })

  it('valid date', () => {
    expect(component.validDate()(new FormControl())).toBe(null)
  })

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
