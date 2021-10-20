import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { Entry, EntryDate, TimelineModel } from '../../utils/timeline';
import { TimelineService } from '../timeline.service';

import { TimelineDialogComponent } from './timeline-dialog.component';

describe('TimelineDialogComponent', () => {
  let component: TimelineDialogComponent;
  let fixture: ComponentFixture<TimelineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineDialogComponent ],
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
      ],
      providers: [
        TimelineService,
        { provide: MatDialogRef, useValue: { close: (timeline: TimelineModel) => { } } }, { provide: MAT_DIALOG_DATA, useValue: { title: "title", timeline: new TimelineModel('', '', 'OTHER', [new Entry('Entry 1', new EntryDate(1999, 1, 1), undefined, undefined, undefined)], '', false, '', '')} }

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
