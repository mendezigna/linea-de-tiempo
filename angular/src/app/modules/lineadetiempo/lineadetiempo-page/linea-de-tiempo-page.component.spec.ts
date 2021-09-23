import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDeTiempoPageComponent } from './linea-de-tiempo-page.component';

describe('LineadetiempoComponent', () => {
  let component: LineaDeTiempoPageComponent;
  let fixture: ComponentFixture<LineaDeTiempoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaDeTiempoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaDeTiempoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
