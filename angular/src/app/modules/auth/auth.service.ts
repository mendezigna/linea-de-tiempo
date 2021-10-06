import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    
    API_URL = environment.apiURL

    constructor(private http: HttpClient){

    }


    login(username: string, password: string): Observable<Object>{
        const fullpath = this.API_URL + "user/login"
        return this.http.post(fullpath, {},{params: {username, password}})
    }

    signup(email: string, password: string, name: string) : Observable<Object>{
        const fullpath = this.API_URL + "user/register"
        return this.http.post(fullpath, {email, password, name})
    }

    saveData(){

    }

    public getUserToken(): string {
        return localStorage.getItem('token') || ""
    }
}