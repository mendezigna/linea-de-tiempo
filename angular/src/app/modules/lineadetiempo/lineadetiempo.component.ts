import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineaDeTiempo } from '../utils/LineaDeTiempo';
import { LineaDeTiempoService } from './lineadetiempo.service';

@Component({
  selector: 'app-lineadetiempo',
  templateUrl: './lineadetiempo.component.html',
  styleUrls: ['./lineadetiempo.component.css']
})
export class LineadetiempoComponent implements OnInit {
  linea : LineaDeTiempo = new LineaDeTiempo();
  id : String = "";
  noExiste : Boolean = false;
  constructor(private route : ActivatedRoute, private lineaDeTiempoService: LineaDeTiempoService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") || ""
    this.lineaDeTiempoService.getLineaDeTiempo(this.id).subscribe({
      next: (data) => {
        this.linea = data as LineaDeTiempo
      },
      error: (error) => {
        this.noExiste = true
      }
    })
  }

}
