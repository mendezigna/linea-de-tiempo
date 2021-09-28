import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Timeline } from "../utils/timeline";

@Injectable()
export class TimelineService {
  constructor(private http : HttpClient){}
  API_URL = environment.apiURL
  getTimeline(id : String) : Observable<Object>{
    return this.http.get(`${this.API_URL}timeline/${id}`)
  }

  saveChanges(linea : Timeline) : Observable<Object> {
    return this.http.put(`${this.API_URL}timeline/${linea._id}`, linea)
  }
}
