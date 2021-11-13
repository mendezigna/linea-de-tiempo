import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories : String[] = []
  categories_image = ["https://cdn-icons-png.flaticon.com/512/2234/2234665.png",
                     "https://cdn-icons-png.flaticon.com/512/326/326786.png",
                     "https://cdn-icons-png.flaticon.com/512/4072/4072131.png",
                     "https://cdn-icons-png.flaticon.com/512/3079/3079106.png",
                     "https://cdn-icons.flaticon.com/png/512/4466/premium/4466298.png?token=exp=1636675045~hmac=6747f1b5e0d8564be303464571a91466"
                     ]
  constructor(private categoryService : CategoryService, private router : Router) { }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories()
  }

  goToCategory(category : String) {
    this.router.navigate(["categories", category])
  }

}
