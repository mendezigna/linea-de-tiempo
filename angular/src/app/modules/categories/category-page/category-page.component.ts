import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(private route : ActivatedRoute, private service : CategoryService, private router : Router) { }
  category : String = ""
  timelines : {"id": String, "title": String}[] = []
  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get("category")
    if (!category || !this.service.getCategories().includes(category)){
      this.router.navigate(['/error'])
    } else {
      this.category = category
      this.service.getWithCategory(this.category).subscribe({
        next: (data)=>{
          this.timelines = data as {"id": String, "title": String}[]
        },
        error: (err)=>{
          console.log(err)
        }
      })
    }
  }

  goToTimeline(id : String) {
    this.router.navigate(['/timeline', id])
  }

}
