import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit() {
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(): void{
    this.router.navigate(["home"])
  }

  clickOnLanguage(){
    console.log("Nice on dudette!")}

  clickOnStyles(){
    console.log("Nice on dude!")
  }
}