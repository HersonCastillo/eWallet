import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }
  public login(user: string, password: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post("http://localhost:3500/login", {
          user: user,
          pass: password
      }).subscribe(response => resolve(response.json()), 
      error => reject(error));
    });
  }
}
