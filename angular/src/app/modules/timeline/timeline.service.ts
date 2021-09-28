import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { EntryDate, Timeline } from "../utils/timeline";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class TimelineService {
  constructor(private http : HttpClient, private translate : TranslateService){}
  API_URL = environment.apiURL
  getTimeline(id : String) : Observable<Object>{
    return this.http.get(`${this.API_URL}timeline/${id}`)
  }

  saveChanges(linea : Timeline) : Observable<Object> {
    return this.http.put(`${this.API_URL}timeline/${linea._id}`, linea)
  }
  dateFormated(date: EntryDate) {
    const year = date.year
    const month = date.month ? date.month : "XX"
    const day = date.day ? date.day : "XX"
    let ad = ''
    if(date.ad){
      this.translate.get('TIMELINE.ENTRY.AD').subscribe((res) => {
        ad = res
      })
    } else {
      this.translate.get('TIMELINE.ENTRY.BC').subscribe((res) => {
        ad = res
      })
    }

    return `${year} - ${month} - ${day} ${ad}`
  }
}
