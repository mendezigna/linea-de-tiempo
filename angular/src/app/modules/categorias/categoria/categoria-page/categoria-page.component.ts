import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }
  categoria : String = ""
  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get("categoria") || "HISTORIA"
  }

}
