import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit() {
  }

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  goToHome(): void{
    this.router.navigate([""])
  }
  goToConfiguration(): void{
    this.router.navigate(["user/configuration"])
  }
  goToCategories(): void{
    this.router.navigate(["categories"])
  }
  logOut():void{
    this.authService.logOut()
    this.router.navigate(["auth/login"])
  }
  goToLogIn():void{
    this.router.navigate(["auth/login"])
  }
  getName(){
    return localStorage.getItem('name')
  }
  logged(){
    return localStorage.getItem('token')
  }

  goToProfile(){
    this.router.navigate(['user/profile'])
  }
}
