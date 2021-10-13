import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { UserService } from '../user.service';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let userService: UserService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent],
      imports:[TranslateTestingModule.withTranslations({}),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDividerModule,
        MatCardModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    TestBed.inject(FormBuilder)
    userService = TestBed.inject(UserService) 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init', () => {
    localStorage.setItem('name', "nombre")
    localStorage.setItem('email', "email@email.com")
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.name).toBe('nombre')
    expect(component.email).toBe('email@email.com')
  })

  it('should change password', async () => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    component.form.get("password")?.setValue('123456')
    component.form.get("newPassword")?.setValue('123456')
    component.form.get("repeatPassword")?.setValue('123456')

    const userSpy = spyOn(userService, 'changePassword').and.callFake((password: string, newPassword: string) => {})
    fixture.detectChanges();
    await component.onSubmit()
    expect(userSpy.calls.count()).toBe(1)
    expect(userSpy).toHaveBeenCalledWith('123456', '123456')
    
  })

  it('invalid form', () => {
    const newPassword = component.form.get("newPassword")
    const password = component.form.get("password")

    expect(newPassword?.hasError('required')).toBe(true)
    expect(password?.hasError('required')).toBe(true)
  })

  it('must match', () => {
    const newPassword = component.form.get("newPassword")
    const repeatPassword = component.form.get("repeatPassword")

    newPassword?.setValue('123456')
    repeatPassword?.setValue('123457')

    expect(repeatPassword?.hasError('mustMatch')).toBe(true)
    repeatPassword?.setValue('123456')
    expect(repeatPassword?.hasError('mustMatch')).toBe(false)

  })
});
