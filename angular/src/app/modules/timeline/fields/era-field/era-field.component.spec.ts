import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraFieldComponent } from './era-field.component';

describe('EraFieldComponent', () => {
  let component: EraFieldComponent;
  let fixture: ComponentFixture<EraFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EraFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
