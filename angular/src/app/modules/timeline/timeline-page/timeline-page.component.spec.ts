import { EntryDialogComponent } from './../entry/entry-dialog/entry-dialog.component';
import { TimelineDate, TimelineModel, TimelineSlide, TimelineText } from './../../utils/timeline';
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
import { Timeline } from '@knight-lab/timelinejs';

import { TimelinePageComponent } from './timeline-page.component';
import { of } from 'rxjs';
import { DeleteDialogComponent } from '../timeline-dialog/delete-dialog/delete-dialog.component';
import { TimelineDialogComponent } from '../timeline-dialog/timeline-dialog.component';

describe('TimelineModelPageComponent', () => {
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
    TestBed.inject(MatSnackBar)
    activeRoute = TestBed.inject(ActivatedRoute)
    timelineService = TestBed.inject(TimelineService)
    TestBed.inject(MatDialog)
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

  it('should have a timeline', async () => {
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('0123456789')
    const timeline = new TimelineModel()
    spyOn(timelineService, 'getTimeline').and.returnValue(Promise.resolve(timeline))
    
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await timelineService.getTimeline('123').then(timeline => component.timeline = timeline)
    expect(component.timeline).toEqual(timeline)
  })

  it('should add new entry', () => {
    // const entry = new Entry('',new EntryDate(2000, 5, 15, true),'', '', '0')
    const entry = new TimelineSlide(new TimelineDate(2021))
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(entry) } as MatDialogRef<EntryDialogComponent>
    );
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.tl = new Timeline('timeline-embed', new TimelineModel())
    component.tl.add = jasmine.createSpy().and.callFake((some : any) => {})

    component.newEntry()
    expect(component.timeline.events.length).toBe(1)
  })

  it('should delete entry', () => {
    // const entry = new Entry('',new EntryDate(2000, 5, 15, true),'', '', '0')
    const entry = new TimelineSlide(new TimelineDate(2021))
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(entry) } as MatDialogRef<EntryDialogComponent>
    );
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.tl = new Timeline('timeline-embed', new TimelineModel())
    component.tl.removeId = jasmine.createSpy().and.callFake((some : any) => {})
    component.tl.add = jasmine.createSpy().and.callFake((some : any) => {})


    component.newEntry()

    expect(component.timeline.events.length).toBe(1)
    component.deleteEntry(entry)
    expect(component.timeline.events.length).toBe(0)
  })

  it('should modify entry', () => {
    // const entry = new Entry('',new EntryDate(2000, 5, 15, true),'', '', '0')
    const entry = new TimelineSlide(new TimelineDate(2000, 5, 15))
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(entry) } as MatDialogRef<EntryDialogComponent>
    );
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.timeline.events = [new TimelineSlide(new TimelineDate(2021, 2, 3))]
    component.tl = new Timeline('timeline-embed', new TimelineModel())
    component.tl.removeId = jasmine.createSpy().and.callFake((some : any) => {})
    component.tl.add = jasmine.createSpy().and.callFake((some : any) => {})

    component.modifyEntry(component.timeline.events[0])
    expect(component.timeline.events[0].start_date).toBe(entry.start_date)
  })

  it('should save changes', () => {
    const spyService = spyOn(timelineService, 'saveChanges').and.callFake((timeLine : TimelineModel) => of())
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.saveChanges()
    expect(spyService.calls.count()).toBe(1)
  })


  it('should delete timeline', () => {
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true) } as MatDialogRef<DeleteDialogComponent>
    );
    spyOn(component.router, 'navigate').and.callFake( (url) => Promise.resolve(true));
    const spyService = spyOn(timelineService, 'deleteTimeline').and.callFake( (id : string) => {})
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.deleteTimeline()
    expect(spyService.calls.count()).toBe(1)
  })

  it('shouldnt delete timeline', () => {
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(false) } as MatDialogRef<DeleteDialogComponent>
    );
    const spyService = spyOn(timelineService, 'deleteTimeline')
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.deleteTimeline()
    expect(spyService.calls.count()).toBe(0)
  })

  it('should modify timeline', () => {
    const timeline = new TimelineModel( new TimelineSlide(new TimelineDate(2021), undefined, new TimelineText("titulo", "subtitulo")), [], "HISTORY")
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(timeline) } as MatDialogRef<TimelineDialogComponent>
    );
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    spyOn(component, 'createTimelinejs').and.callFake( () => {})

    fixture.detectChanges()
    component.editTimeline()
    expect(component.timeline.title?.text?.headline).toBe(timeline.title?.text?.headline)
    expect(component.timeline.title?.text?.text).toBe(timeline.title?.text?.text)
    expect(component.timeline.category).toBe(timeline.category)
  })

  it('should publish timeline', () => {
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    const timeline = new TimelineModel( new TimelineSlide(new TimelineDate(2021), undefined, new TimelineText("titulo", "subtitulo")), [], "HISTORY")
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true) } as MatDialogRef<TimelineDialogComponent>
    );
    const spyService = spyOn(timelineService, 'publish')
    spyService.and.callFake(() => {})
    component.timeline = timeline
    
    fixture.detectChanges()
    
    component.publish()
    expect(component.timeline.published).toBeTruthy()
    expect(spyService.calls.count()).toBe(1)
  })

  it('shouldnt publish timeline', () => {
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    const timeline = new TimelineModel( new TimelineSlide(new TimelineDate(2021), undefined, new TimelineText("titulo", "subtitulo")), [], "HISTORY")
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(false) } as MatDialogRef<TimelineDialogComponent>
    );
    
    fixture.detectChanges()
    
    component.publish()
    expect(component.timeline.published).toBeFalsy()
  })

  it('should unpublish timeline', () => {
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    const timeline = new TimelineModel( new TimelineSlide(new TimelineDate(2021), undefined, new TimelineText("titulo", "subtitulo")), [], "HISTORY", true)
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true) } as MatDialogRef<TimelineDialogComponent>
    );
    const spyService = spyOn(timelineService, 'unpublish')
    spyService.and.callFake(() => {})
    component.timeline = timeline
    
    fixture.detectChanges()
    
    component.publish()
    expect(component.timeline.published).toBeFalsy()
    expect(spyService.calls.count()).toBe(1)
  })

  it('shouldnt unpublish timeline', () => {
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    const timeline = new TimelineModel( new TimelineSlide(new TimelineDate(2021), undefined, new TimelineText("titulo", "subtitulo")), [], "HISTORY", true)
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(false) } as MatDialogRef<TimelineDialogComponent>
    );
    component.timeline = timeline
    
    fixture.detectChanges()
    
    component.publish()
    expect(component.timeline.published).toBeTruthy()
  })

  it('should export timeline', () => {
    fixture = TestBed.createComponent(TimelinePageComponent)
    component = fixture.componentInstance
    
    component.downloadJsonHref = ''
    
    fixture.detectChanges()
    component.generateDownloadJsonUri()
    expect(component.downloadJsonHref).toBeTruthy()
  })
});
