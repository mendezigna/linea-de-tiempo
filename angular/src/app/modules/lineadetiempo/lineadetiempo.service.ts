import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { LineaDeTiempo } from "../utils/LineaDeTiempo";

@Injectable()
export class LineaDeTiempoService {
  constructor(private http : HttpClient){}
  API_URL = environment.apiURL
  getLineaDeTiempo(id : String) : Observable<Object>{
    return this.http.get(`${this.API_URL}lineaDeTiempo/${id}`)
  }

  guardarCambios(linea : LineaDeTiempo) : Observable<Object> {
    return this.http.put(`${this.API_URL}lineaDeTiempo/${linea._id}`, linea)
  }
}
