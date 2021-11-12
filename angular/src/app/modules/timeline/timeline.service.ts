import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { TimelineDate, TimelineModel } from "../utils/timeline";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class TimelineService {
  HISTORY:   String = 'HISTORY';
  GEOGRAPHY: String = 'GEOGRAPHY';
  BIOGRAPHY: String = 'BIOGRAPHY';
  FICTION:   String = 'FICTION';
  OTHER:     String = 'OTHER';

  id : number = 0;
  API_URL = environment.apiURL

  constructor(private http: HttpClient, private translate: TranslateService, private _snackBar: MatSnackBar, private router: Router) { }

  nextId() {
    this.id += 1
    return `${this.id}`
  }

  getTimeline(id: String): Promise<TimelineModel> {
    const token = localStorage.getItem('token')
    return this.http.get(`${this.API_URL}timeline/${id}`,{headers: new HttpHeaders().set('Authorization', token!)}).toPromise().then((data) => {
      const datatimeline : TimelineModel = Object.assign(new TimelineModel(), data)
      const events = datatimeline.events
      datatimeline.events = []
      events.forEach(event => {
        event.unique_id = this.nextId()
        datatimeline.events.push(event)
      });
      return datatimeline

      // return new TimelineModel(datatimeline.title, datatimeline.subtitle, datatimeline.category,
      //   datatimeline.entries.map((entry, index) => {
      //     return new Entry(entry.title, new EntryDate(entry.date.year, entry.date.month, entry.date.day, entry.date.ce), entry.text, entry.media, entry._id, `${index}`)
      //   }), datatimeline._id, datatimeline.published, datatimeline.owner, datatimeline.media)

    }).catch((err) => {
      this.router.navigate(['/error'])
      return Promise.reject(err)
    })
  }

  getTimelineView(id: String): Promise<TimelineModel> {
    return this.http.get(`${this.API_URL}timeline/view/${id}`).toPromise().then((data) => {
      const datatimeline : TimelineModel = data as TimelineModel
      return datatimeline
      // return new TimelineModel(datatimeline.title, datatimeline.subtitle, datatimeline.category,
      //   datatimeline.entries.map((entry, index) => {
      //     return new Entry(entry.title, new EntryDate(entry.date.year, entry.date.month, entry.date.day, entry.date.ce), entry.text, entry.media, entry._id, `${index}`)
      //   }), datatimeline._id, datatimeline.published, datatimeline.owner, datatimeline.media)

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
  dateFormated(date: TimelineDate) {
    const year = date.year
    const month = date.month ? date.month : "XX"
    const day = date.day ? date.day : "XX"
    let ce = ''
    if (date) {
      this.translate.get('TIMELINE.ENTRY.AD').subscribe((res) => {
        ce = res
      })
    } else {
      this.translate.get('TIMELINE.ENTRY.BC').subscribe((res) => {
        ce = res
      })
    }

    return `${year} - ${month} - ${day} ${ce}`
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

  getScales(): String[] {
    return ['human', 'cosmological']
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
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      }
    })
  }
  publish(id : string){
    const token = localStorage.getItem('token')
    this.http.post(`${this.API_URL}timeline/${id}/publish`, {},{headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
      next: async (result) => {
        const success = await this.translate.get('TIMELINE.TIMELINEPAGE.PUBLISHED').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()
        this.router.navigate(['timeline/dashboard'])
        this._snackBar.open(success, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      },
      error: async (err) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      }
    })
  }

  unpublish(id : string){
    const token = localStorage.getItem('token')
    this.http.post(`${this.API_URL}timeline/${id}/unpublish`, {}, {headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
      next: async (result) => {
        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.UNPUBLISHED').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      },
      error: async (err) => {
        console.log(err)

        const error = await this.translate.get('TIMELINE.TIMELINEPAGE.ERROR').toPromise()
        const close = await this.translate.get('TIMELINE.TIMELINEPAGE.CLOSE').toPromise()

        this._snackBar.open(error, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top'});
      }
    })
  }

  getWithName(name : string): Observable<Object>{
    return this.http.get(`${environment.apiURL}timeline/search/${name}`)

  }
}
