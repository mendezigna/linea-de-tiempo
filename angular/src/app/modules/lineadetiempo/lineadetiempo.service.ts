import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class LineaDeTiempoService {
  constructor(private http : HttpClient){}
  getLineaDeTiempo(id : String) : Observable<Object>{
    return this.http.get(`${environment.apiURL}lineadetiempo/id`)
  }
}
