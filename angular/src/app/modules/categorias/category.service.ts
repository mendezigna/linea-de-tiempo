import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  HISTORIA: String = 'HISTORIA';
  GEOGRAFIA: String = 'GEOGRAFIA';
  BIOGRAFIA: String = 'BIOGRAFIA';
  FICCION: String = 'FICCION';
  OTROS: String = 'OTROS';

  constructor(private http:HttpClient){}

  getCategories(): String[] {
    return [
      this.HISTORIA, this.GEOGRAFIA, this.FICCION, this.BIOGRAFIA, this.OTROS
    ];
  }

  getWithCategory(category: String): Observable<Object> {
    return this.http.get(`${environment.apiURL}timeLine/category/${category}`)
  }


}
