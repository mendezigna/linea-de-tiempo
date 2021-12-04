import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../utils/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  public notExist = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.authService.saveData(data as User)
          this.router.navigate([''])
        },
        error: (error) => {
          if(error.status == 400){
            this.notExist = true
          } else {
            this.loginInvalid = true
          }
        }
      })
    }
  }

  goToSignup() {
    this.router.navigate(["auth/signup"])
  }
}
