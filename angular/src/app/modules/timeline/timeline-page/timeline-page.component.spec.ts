import { EntryDialogComponent } from './../entry/entry-dialog/entry-dialog.component';
import { Timeline, Entry } from './../../utils/timeline';
import { VisualizationComponent } from './../visualization/visualization.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { TimelineService } from '../timeline.service';

import { TimelinePageComponent } from './timeline-page.component';
import { of } from 'rxjs';

describe('TimelinePageComponent', () => {
  let component: TimelinePageComponent;
  let fixture: ComponentFixture<TimelinePageComponent>;
  let activeRoute: ActivatedRoute
  let timelineService: TimelineService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelinePageComponent, VisualizationComponent],
      providers: [TimelineService],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    timelineService = TestBed.inject(TimelineService)
    TestBed.inject(MatDialog)
    TestBed.inject(MatSnackBar)
    activeRoute = TestBed.inject(ActivatedRoute)
    TestBed.inject(Router)
    TestBed.inject(TranslateService)
    fixture = TestBed.createComponent(TimelinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an id', () => {
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('0123456789')
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.id).toBe('0123456789')
  })

  it('should have a timeline', () => {
    const timeLine = new Timeline()
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('0123456789')
    const spyService = spyOn(timelineService, 'getTimeline')
    spyService.and.returnValue(of(timeLine))
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.timeline).toBe(timeLine)
  })

  it('should add new entry', () => {
    component.timeline.entries = []
    component.addEntry()
    component.addEntry()

    expect(component.timeline.entries.length).toBe(2)
  })

  it('should delete entry', () => {
    component.addEntry()
    component.deleteEntry(component.timeline.entries[0])

    expect(component.timeline.entries.length).toBe(0)
  })

  it('should modify entry', () => {
    const entry = new Entry()
    entry.date = { day: 15, month: 5, year: 2000, ad: true }
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(entry) } as MatDialogRef<EntryDialogComponent>
    );
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.timeline.entries = [new Entry()]
    component.modifyEntry(component.timeline.entries[0])
    expect(component.timeline.entries[0].date).toBe(entry.date)
  })

  it('should save changes', () => {
    const spyService = spyOn(timelineService, 'saveChanges').and.callFake((timeLine : Timeline) => of())
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.saveChanges()
    expect(spyService.calls.count()).toBe(1)
  })
});
