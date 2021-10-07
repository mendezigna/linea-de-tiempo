import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared-module";
import { MaterialModule } from "../ui/material.module";
import { AuthService } from "./auth.service";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginUnqComponent } from './login-unq/login-unq.component';
import { LoginComponent } from './login/login.component';

const routes : Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'signup',
        component: SignupPageComponent
    }
]

@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    LoginUnqComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService]
}) export class AuthModule {}