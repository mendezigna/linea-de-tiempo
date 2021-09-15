import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineaDeTiempo } from '../../utils/LineaDeTiempo';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {

  constructor(private route : ActivatedRoute, private service : CategoriaService) { }
  categoria : String = ""
  lineasDeTiempo : LineaDeTiempo[] = []
  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get("categoria") || "HISTORIA"
    this.service.getWithCategoria(this.categoria).subscribe({
      next: (data)=>{
        this.lineasDeTiempo = data as LineaDeTiempo[]
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

}
