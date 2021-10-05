import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Entry, EntryDate, TimelineModel } from "../utils/timeline";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class TimelineService {
  constructor(private http: HttpClient, private translate: TranslateService, private _snackBar: MatSnackBar, private router: Router) { }
  API_URL = environment.apiURL
  async getTimeline(id: String) : Promise<TimelineModel> {
    return await this.http.get(`${this.API_URL}timeline/${id}`).toPromise().then( (data) => {
      const datatimeline = data as TimelineModel
        return  new TimelineModel(datatimeline.title, datatimeline.subtitle, datatimeline.category,
          datatimeline.entries.map((entry, index) => {
            return new Entry(entry.title, new EntryDate(entry.date.year, entry.date.month, entry.date.day, entry.date.ad), entry.text, entry._id, `${index}`)
          }), datatimeline._id)
    }).catch( (err) => {
      this.router.navigate(['/error'])
      return Promise.reject(err)
    })
  }

  saveChanges(linea: TimelineModel) {
    this.http.put(`${this.API_URL}timeline/${linea._id}`, linea).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.SUCCESS').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()
        this._snackBar.open(success, close, { duration: 3000 });
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000 });
      }
    })
  }
  dateFormated(date: EntryDate) {
    const year = date.year
    const month = date.month ? date.month : "XX"
    const day = date.day ? date.day : "XX"
    let ad = ''
    if (date.ad) {
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
