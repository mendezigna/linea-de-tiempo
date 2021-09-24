import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categorias-page.component.html',
  styleUrls: ['./categorias-page.component.css']
})
export class CategoriasPageComponent implements OnInit {

  categorias : String[] = []
  colores: String[] = ["#70929c","#70929c","#70929c","#70929c","#70929c"]
  constructor(private categoriaService : CategoriaService, private router : Router) { }
  ngOnInit(): void {
    this.categorias = this.categoriaService.getCategorias()
  }

  irACategoria(categoria : String) {
    this.router.navigate(["categorias", categoria])
  }

}
