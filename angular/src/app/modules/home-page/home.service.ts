import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimelineModel } from '../utils/timeline';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getExamples(): Promise<TimelineModel[]> {
    return this.http.get(`${environment.apiURL}timeline/example`).toPromise().then(data => {
      return data as TimelineModel[]
    }).catch( err => {
      console.log(err)
      return []
    })
  }
}
