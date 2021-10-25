import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
    API_URL = environment.apiURL

    constructor(private http: HttpClient, private _snackBar: MatSnackBar, private translate : TranslateService){

    }


    changePassword(oldPassword: string, newPassword: string): void{
        const token = localStorage.getItem('token')

        const fullpath = this.API_URL + "user/changepassword"
        this.http.put(fullpath, {oldPassword, newPassword},{headers: new HttpHeaders().set('Authorization', token!)}).subscribe({
            next: async () => {
                const message = await this.translate.get('USER.PROFILE.SUCCESS').toPromise()
                const close = await this.translate.get('USER.PROFILE.CLOSE').toPromise()
                this._snackBar.open(message, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top' });
            },
            error: async (err) => {
                const message = await this.translate.get('USER.PROFILE.ERROR.'+err.error.invalidPassword).toPromise()
                const close = await this.translate.get('USER.PROFILE.CLOSE').toPromise()
                this._snackBar.open(message, close, { duration: 3000, horizontalPosition:  'center', verticalPosition: 'top' });
            }
        })
    }
}