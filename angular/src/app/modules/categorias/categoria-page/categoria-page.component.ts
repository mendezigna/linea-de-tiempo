import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaDeTiempo } from '../../utils/LineaDeTiempo';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {

  constructor(private route : ActivatedRoute, private service : CategoriaService, private router : Router) { }
  categoria : String = ""
  lineasDeTiempo : {"id": String, "titulo": String}[] = []
  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get("categoria") || "HISTORIA"
    this.service.getWithCategoria(this.categoria).subscribe({
      next: (data)=>{
        this.lineasDeTiempo = data as {"id": String, "titulo": String}[]
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  irALineaDeTiempo(id : String) {
    this.router.navigate(['/lineadetiempo', id])
  }

}
