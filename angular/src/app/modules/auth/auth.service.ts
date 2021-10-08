import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { User } from "../utils/user";

@Injectable()
export class AuthService {
    
    API_URL = environment.apiURL

    constructor(private http: HttpClient){

    }


    login(email: string, password: string): Observable<Object>{
        const fullpath = this.API_URL + "user/login"
        return this.http.post(fullpath, {email, password})
    }

    signup(email: string, password: string, name: string) : Observable<Object>{
        const fullpath = this.API_URL + "user/register"
        return this.http.post(fullpath, {email, password, name})
    }

    saveData(user : User){
        localStorage.setItem('token', user.token)
        localStorage.setItem('name', user.name)
        localStorage.setItem('email', user.email)
    }

    logOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
    }

    public getUserToken(): string {
        return localStorage.getItem('token') || ""
    }
}