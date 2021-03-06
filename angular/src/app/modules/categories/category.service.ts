import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimelineModel } from '../utils/timeline';

@Injectable()
export class CategoryService {
  HISTORY:  String = 'HISTORY';
  GEOGRAPHY: String = 'GEOGRAPHY';
  BIOGRAPHY: String = 'BIOGRAPHY';
  FICTION:   String = 'FICTION';
  OTHER:     String = 'OTHER';

  constructor(private http:HttpClient){}

  getCategories(): String[] {
    return [
      this.HISTORY, this.GEOGRAPHY, this.FICTION, this.BIOGRAPHY, this.OTHER
    ];
  }

  getWithCategory(category: String): Promise<TimelineModel[]> {
    return this.http.get(`${environment.apiURL}timeLine/category/${category}`).toPromise().then(data => {
      return data as TimelineModel[]
    }).catch(err => {
      console.log(err)
      return []
    })
  }


}
