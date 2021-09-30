import { Component, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  styles: [
  ],
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll');
  }

  constructor(private router : Router) { }

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
