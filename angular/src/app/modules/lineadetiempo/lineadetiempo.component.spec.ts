import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineadetiempoComponent } from './lineadetiempo.component';

describe('LineadetiempoComponent', () => {
  let component: LineadetiempoComponent;
  let fixture: ComponentFixture<LineadetiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineadetiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineadetiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
