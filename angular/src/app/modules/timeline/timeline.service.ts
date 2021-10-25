import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Entry, EntryDate, TimelineModel } from "../utils/timeline";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class TimelineService {
  HISTORY:  String = 'HISTORY';
  GEOGRAPHY: String = 'GEOGRAPHY';
  BIOGRAPHY: String = 'BIOGRAPHY';
  FICTION:   String = 'FICTION';
  OTHER:     String = 'OTHER';

  constructor(private http: HttpClient, private translate: TranslateService, private _snackBar: MatSnackBar, private router: Router) { }
  API_URL = environment.apiURL
  getTimeline(id: String): Promise<TimelineModel> {
    return this.http.get(`${this.API_URL}timeline/${id}`).toPromise().then((data) => {
      const datatimeline = data as TimelineModel

      return new TimelineModel(datatimeline.title, datatimeline.subtitle, datatimeline.category,
        datatimeline.entries.map((entry, index) => {
          return new Entry(entry.title, new EntryDate(entry.date.year, entry.date.month, entry.date.day, entry.date.ad), entry.text, entry.media, entry._id, `${index}`)
        }), datatimeline._id, datatimeline.published, datatimeline.owner, datatimeline.media)

    }).catch((err) => {
      this.router.navigate(['/error'])
      return Promise.reject(err)
    })
  }

  saveChanges(linea: TimelineModel) {
    const token = localStorage.getItem('token')
    this.http.put(`${this.API_URL}timeline/${linea._id}`, linea, {headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.SUCCESS').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()
        this._snackBar.open(success, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
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

  async getAll() : Promise<TimelineModel[]>{
    return this.http.get(`${this.API_URL}timeline/mytimelines`, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')!) }).toPromise().then( res => {
      return res as TimelineModel[]
    }).catch( err => {
      this.router.navigate(['/error'])
      return Promise.reject(err)
    })
  }

  getCategories(): String[] {
    return [
      this.HISTORY, this.GEOGRAPHY, this.FICTION, this.BIOGRAPHY, this.OTHER
    ];
  }

  saveTimeline(timeline : TimelineModel) {
    const token = localStorage.getItem('token')
    this.http.post(`${this.API_URL}timeline/`, timeline, {headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
      next: async (result) => {
        const tl = result as TimelineModel
        this.router.navigate(['timeline', tl._id])
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      }
    })
  }

  async getNewEntryTitle() : Promise<string> {
    return await this.translate.get('TIMELINE.DASHBOARD.NEWENTRY').toPromise()
  }

  deleteTimeline(id : string){
    const token = localStorage.getItem('token')
    this.http.delete(`${this.API_URL}timeline/${id}`, {headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.DELETED').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(success, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      },
      error: async (err) => {
        console.log(err)
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      }
    })
  }
  publish(){

  }

  unpublish(){
    
  }
}
