import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable, of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { AuthService } from '../auth.service';

import { SignupPageComponent } from './signup-page.component';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let authService : AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPageComponent ],
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
    fixture = TestBed.createComponent(SignupPageComponent);
    TestBed.inject(Router)
    authService = TestBed.inject(AuthService)
    TestBed.inject(FormBuilder)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should sign up', async () => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    component.form.get("name")?.setValue('name')
    component.form.get("password")?.setValue('123456')
    component.form.get("repeatPassword")?.setValue('123456')
    component.form.get("email")?.setValue('hola@mail.com')
    spyOn(authService, 'signup').and.callFake((email : string, password: string, name : string) => of({email: "hola@mail.com", token: "token", name: "name"}))
    const saveSpy = spyOn(authService, 'saveData')
    fixture.detectChanges();
    await component.onSubmit().then(() => {
      expect(saveSpy.calls.count()).toBe(1)
      expect(saveSpy).toHaveBeenCalledWith({email: "hola@mail.com", token: "token", name: "name"})
    })
  })

  it('shouldnt sign up', async () => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    component.form.get("name")?.setValue('name')
    component.form.get("password")?.setValue('123456')
    component.form.get("repeatPassword")?.setValue('123456')
    component.form.get("email")?.setValue('hola@mail.com')
    spyOn(authService, 'signup').and.callFake((email : string, password: string, name : string) => throwError({status: 409}))
    fixture.detectChanges();
    await component.onSubmit().then(() => {
      expect(component.duplicated).toBe(true)
    })
  })

  it('invalid form', () => {
    const name = component.form.get("name")
    const email = component.form.get("email")
    const password = component.form.get("password")

    expect(name?.hasError('required')).toBe(true)
    expect(password?.hasError('required')).toBe(true)
    expect(email?.hasError('required')).toBe(true)
  })

  it('must match', () => {
    const password = component.form.get("password")
    const repeatPassword = component.form.get("repeatPassword")

    password?.setValue('123456')
    repeatPassword?.setValue('123457')

    expect(repeatPassword?.hasError('mustMatch')).toBe(true)
    repeatPassword?.setValue('123456')
    expect(repeatPassword?.hasError('mustMatch')).toBe(false)

  })
});
