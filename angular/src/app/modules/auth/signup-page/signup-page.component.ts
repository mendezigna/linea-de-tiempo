import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  form: FormGroup;
  public signupInvalid = false;
  public duplicated = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ["", [Validators.required]],
      name: ['', Validators.required]
    },
      {
        validators: [this.mustMatch],
      }
    );
  }

  ngOnInit() {

  }

  async onSubmit(): Promise<void> {
    this.signupInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      const name = this.form.get('name')?.value;
      this.authService.signup(username, password, name).subscribe({
        next: (data) => {
          this.authService.saveData()
          this.router.navigate(['test/prueba'])
        },
        error: (error) => {
          /* TODO */
          if(true){
            this.duplicated = false;
          } else {
            this.signupInvalid = true
          }
        }
      })
    }
  }

  goToLogin() {
    this.router.navigate(["auth/login"])
  }

  mustMatch(c: AbstractControl) {
    const password = c.get("password");
    const repeatPassword = c.get("repeatPassword");
    if (password?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors({ mustMatch: true });
      return { invalid: true };
    } else {
      repeatPassword?.setErrors(null);
      return null
    }
  }
}
