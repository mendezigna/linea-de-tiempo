import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService : AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    TestBed.inject(Router)
    authService = TestBed.inject(AuthService)
    TestBed.inject(FormBuilder)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.form.get("password")?.setValue('123456')
    component.form.get("email")?.setValue('hola@mail.com')
    spyOn(authService, 'login').and.callFake((email : string, password: string) => of({email: "hola@mail.com", token: "token", name: "name"}))
    const saveSpy = spyOn(authService, 'saveData')
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
    await component.onSubmit().then(() => {
      expect(saveSpy.calls.count()).toBe(1)
      expect(saveSpy).toHaveBeenCalledWith({email: "hola@mail.com", token: "token", name: "name"})
    })
  })

  it('invalid form', () => {
    const email = component.form.get("email")
    const password = component.form.get("password")

    expect(password?.hasError('required')).toBe(true)
    expect(email?.hasError('required')).toBe(true)
  })

  it('shouldnt log in', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.form.get("password")?.setValue('123456')
    component.form.get("email")?.setValue('hola@mail.com')
    spyOn(authService, 'login').and.callFake((email : string, password: string) => throwError({status: 400}))
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    await component.onSubmit().then(() => {
      expect(component.notExist).toBe(true)
    })
  })
});
