import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { TimelineModel } from '../../utils/timeline';
import { TimelinePageComponent } from '../timeline-page/timeline-page.component';
import { TimelineService } from '../timeline.service';

import { EmbeddedComponent } from './embedded.component';

describe('EmbeddedComponent', () => {
  let component: EmbeddedComponent;
  let fixture: ComponentFixture<EmbeddedComponent>;
  let activeRoute: ActivatedRoute
  let timelineService: TimelineService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedComponent ],
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
      ],
      providers: [TimelineService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedComponent);
    component = fixture.componentInstance;
    activeRoute = TestBed.inject(ActivatedRoute)
    timelineService = TestBed.inject(TimelineService)
    TestBed.inject(MatDialog)
    TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a timeline', async () => {
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('0123456789')
    const timeline = new TimelineModel()
    spyOn(timelineService, 'getTimeline').and.returnValue(Promise.resolve(timeline))
    
    fixture = TestBed.createComponent(EmbeddedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await timelineService.getTimeline('123').then(timeline => component.timeline = timeline)
    expect(component.timeline).toEqual(timeline)
  })
});

