import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean{
    if(!this.auth.isAuthenticated()){
      localStorage.removeItem('token');
      localStorage.removeItem('key');
      localStorage.removeItem('start_session');
      localStorage.removeItem('finish_session');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
