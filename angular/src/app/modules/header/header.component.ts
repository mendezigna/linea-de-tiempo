import { Component, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

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

  constructor() { }

  ngOnInit(): void {
  }

}
