import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  
  form: FormGroup;
  public name : string = '';
  public email : string = '';

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ["", [Validators.required]],
    },
      {
        validators: [this.mustMatch],
      }
    );
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!
    this.email = localStorage.getItem('email')!
  }

  private mustMatch(c: AbstractControl) {
    const newPassword = c.get("newPassword");
    const repeatPassword = c.get("repeatPassword");
    if (newPassword?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors({ mustMatch: true });
      return { invalid: true };
    } else {
      repeatPassword?.setErrors(null);
      return null
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      const newPassword = this.form.get('newPassword')?.value;

      this.userService.changePassword(password, newPassword)
    }
  }

}
