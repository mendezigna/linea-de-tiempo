import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TimelineService } from '../timeline.service';
import { DragScrollModule } from 'ngx-drag-scroll';

import { DashboardComponent } from './dashboard.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TimelineModel } from '../../utils/timeline';
import { TimelineDialogComponent } from '../timeline-dialog/timeline-dialog.component';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared-module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let timelineService: TimelineService
  const timeline1 = new TimelineModel("", "", 'HISTORY', [], "", true)
  const timeline2 = new TimelineModel("", "", 'HISTORY', [], "", true)
  const timeline3 = new TimelineModel("", "", 'HISTORY', [], "", false)
  const timelines: TimelineModel[] = [timeline1, timeline2, timeline3]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        HttpClientModule,
        TranslateTestingModule.withTranslations({}),
        MatSnackBarModule,
        RouterTestingModule,
        MatCardModule,
        SharedModule,
        DragScrollModule,
        MatDialogModule
      ],
      providers: [TimelineService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    timelineService = TestBed.inject(TimelineService)
    spyOn(timelineService, 'getAll').and.callFake(() => Promise.resolve(timelines))
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have timelines', async () => {
    await timelineService.getAll().then(timelines => component.timelines = timelines)
    expect(component.timelines).toBe(timelines);
  });

  it('published', async () => {
    await timelineService.getAll().then(timelines => component.timelines = timelines)

    expect(component.published()).toContain(timeline2, timeline1)
  });

  it('In process', async () => {
    await timelineService.getAll().then(timelines => component.timelines = timelines)

    expect(component.inProcess()).toContain( timeline3)
  });

  it('should create timeline',async () => {
    const timeline = new TimelineModel("", "", 'HISTORY', [], "", true)
    const spyDialog = spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(timeline) } as MatDialogRef<TimelineDialogComponent>
    );
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    const spyService = spyOn(timelineService, 'saveTimeline').and.callFake( () => {})
    await component.newTimeline()
    expect(spyService.calls.count()).toBe(1)
    expect(spyDialog.calls.count()).toBe(1)
  })
});
