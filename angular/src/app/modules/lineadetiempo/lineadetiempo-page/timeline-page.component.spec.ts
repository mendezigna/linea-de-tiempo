import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePageComponent } from './timeline-page.component';

describe('TimelineComponent', () => {
  let component: TimelinePageComponent;
  let fixture: ComponentFixture<TimelinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
