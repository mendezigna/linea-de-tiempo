import { Entry, Timeline } from './../../utils/timeline';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { TimelineService } from '../timeline.service';

import { VisualizationComponent } from './visualization.component';

describe('VisualizationComponent', () => {
  let component: VisualizationComponent;
  let fixture: ComponentFixture<VisualizationComponent>;
  let timelineService : TimelineService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizationComponent],
      providers: [TimelineService],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        NgbModule,
        ScrollingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    timelineService = TestBed.inject(TimelineService)
    TestBed.inject(NgbCarouselConfig)
    fixture = TestBed.createComponent(VisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have timeline', () => {
    expect(component.timeline).toBeTruthy();
  });

  it('should order entries', () => {
    const entry = new Entry()
    const first = new Entry()
    first.date = {year:2021, month:1, day:1, ad: false}
    const last = new Entry()
    last.date = {year:2030, month:1, day:1, ad: true} 
    component.timeline.entries = [entry,first,last,entry]
    const orderedEntries = component.orderEntries()
    expect(orderedEntries.shift()).toBe(first)
    expect(orderedEntries.pop()).toBe(last)
  })

  it('should order entries by date', () => {
    const entry = new Entry()
    const first = new Entry()
    first.date = {year:2021, month:1, day:1, ad: false}
    const last = new Entry()
    last.date = {year:2030, month:1, day:1, ad: true} 
    component.timeline.entries = [entry,first,last,entry]
    const orderedEntries = component.orderEntriesByDate()
    expect(orderedEntries.length).toBe(3)
    expect(orderedEntries[0].date).toBe(timelineService.dateFormated(first.date))
    expect(orderedEntries[1].date).toBe(timelineService.dateFormated(entry.date))
    expect(orderedEntries[1].entries.length).toBe(2)
    expect(orderedEntries[2].date).toBe(timelineService.dateFormated(last.date))
  })
});
