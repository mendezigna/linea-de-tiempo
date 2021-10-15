import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TimelineModel } from '../utils/timeline';
import { HomeService } from './home.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  timelines: TimelineModel[] = []

  constructor(private router : Router, private service : HomeService) { }
  ngOnInit(): void {
    this.service.getExamples().subscribe({
      next: (data)=>{
        this.timelines = data as TimelineModel[]
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  goToCategories(): void{
    this.router.navigate(["categories"])
  }

}
