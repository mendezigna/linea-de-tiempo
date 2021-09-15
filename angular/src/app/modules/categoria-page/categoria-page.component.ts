import { Component, OnInit } from '@angular/core';
import { Categoria } from '../utils/categoria';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {

  categorias : String[] = []
  constructor() { }
  ngOnInit(): void {
    this.categorias = new Categoria().getCategorias()
  }

}
