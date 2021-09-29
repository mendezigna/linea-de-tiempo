import { Route } from '@angular/compiler/src/core';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories : String[] = []
  colores: String[] = ["#70929c","#70929c","#70929c","#70929c","#70929c"]
  constructor(private categoryService : CategoryService, private router : Router) { }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories()
  }

  goToCategory(category : String) {
    this.router.navigate(["categories", category])
  }

}
