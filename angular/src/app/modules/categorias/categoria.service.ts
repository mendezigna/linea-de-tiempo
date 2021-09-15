import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LineaDeTiempo } from '../utils/LineaDeTiempo';

@Injectable()
export class CategoriaService {
  HISTORIA: String = 'HISTORIA';
  GEOGRAFIA: String = 'GEOGRAFIA';
  BIOGRAFIA: String = 'BIOGRAFIA';
  FICCION: String = 'FICCION';
  OTROS: String = 'OTROS';

  constructor(private http:HttpClient){}

  getCategorias(): String[] {
    return [
      this.HISTORIA, this.GEOGRAFIA, this.FICCION, this.BIOGRAFIA, this.OTROS
    ];
  }

  getWithCategoria(categoria: String): Observable<Object> {
    return this.http.get(`${environment.apiURL}lineaDeTiempo/categoria/${categoria}`)
  }


}
