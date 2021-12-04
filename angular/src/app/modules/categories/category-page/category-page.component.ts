import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineModel } from '../../utils/timeline';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CategoryService, private router: Router) { }
  category: String = ""
  timelines: TimelineModel[] = []
  ngOnInit(): void {
    const urlCategory = this.route.snapshot.paramMap.get("category")
    if (!urlCategory || !this.service.getCategories().includes(urlCategory)) {
      this.router.navigate(['/error'])
    } else {
      this.category = urlCategory
      this.service.getWithCategory(this.category).then(data => {
        this.timelines = data
      })
    }
  }
  goToTimeline(id: String) {
    this.router.navigate(['/timeline', id])
  }

}
