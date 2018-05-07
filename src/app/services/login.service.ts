import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http, private globals: GlobalsService) { }
  public login(user: string, password: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "login", {
          user: user,
          pass: password
      }).subscribe(response => resolve(response.json()), 
      error => reject(error));
    });
  }
  public isTokenValid(token: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "validToken", {
        token: token
      }).subscribe(response => resolve(response.json()), 
      error => reject(error));
    });
  }
}
