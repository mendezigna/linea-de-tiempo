import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoDialogComponent } from './punto-dialog.component';

describe('PuntoDialogComponent', () => {
  let component: PuntoDialogComponent;
  let fixture: ComponentFixture<PuntoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
