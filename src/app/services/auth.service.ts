import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private loginProvider: LoginService) { }
  isAuthenticated(): boolean{
    let fi = localStorage.getItem('start_session');
    let ff = localStorage.getItem('finish_session');
    let token = localStorage.getItem('token');
    let key = localStorage.getItem('key');

    let ffi = new Date(fi);
    let fff = new Date(ff);
    let now = new Date();

    if(fff > ffi && fff > now) {
      try{
        let t = token.toString();
        let k = key.toString();
        if(t.length > 0 && k.length > 0) return true;
      }catch(ex){
        return false;
      }
    }
    else return false;
  }
}
