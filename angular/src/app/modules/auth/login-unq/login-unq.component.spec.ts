import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUnqComponent } from './login-unq.component';

describe('LoginUnqComponent', () => {
  let component: LoginUnqComponent;
  let fixture: ComponentFixture<LoginUnqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUnqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUnqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
