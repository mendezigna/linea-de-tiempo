import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { TimelineService } from '../timeline.service';

import { TimelinePageComponent } from './timeline-page.component';

describe('TimelinePageComponent', () => {
  let component: TimelinePageComponent;
  let fixture: ComponentFixture<TimelinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePageComponent ],
      providers: [TimelineService],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePageComponent);
    TestBed.inject(TimelineService)
    TestBed.inject(MatDialog)
    TestBed.inject(MatSnackBar)
    TestBed.inject(ActivatedRoute)
    TestBed.inject(Router)
    TestBed.inject(TranslateService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
