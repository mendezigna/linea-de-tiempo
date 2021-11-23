import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../categories/category.service';
import { TimelineModel } from '../utils/timeline';
import { HomeService } from './home.service'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  timelines: TimelineModel[] = []
  userName : string | null = ''

  categories : String[] = []

  constructor(private categoryService : CategoryService, private router : Router, private service : HomeService) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem('name')
    this.categories = this.categoryService.getCategories()
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

  goToNewTimeline(){
    this.router.navigate(["timeline/dashboard"])
  }
    

  goToCategory(category : String) {
    this.router.navigate(["categories", category])
  }
  
}
