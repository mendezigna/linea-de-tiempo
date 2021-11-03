import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideFieldComponent } from './slide-field.component';

describe('SlideFieldComponent', () => {
  let component: SlideFieldComponent;
  let fixture: ComponentFixture<SlideFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
