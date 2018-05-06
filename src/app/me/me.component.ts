import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SimpleComponent } from '../modals/simple/simple.component';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog) {}
  alert(title: string, message: string, fn: Function): void{
    SimpleComponent.setMessage(title, message, fn);
    this.dialog.open(SimpleComponent);
  }
  confirm(title: string, message: string, fs: Function, fc: Function): void{
    ConfirmComponent.setMessage(title, message, fs, fc);
    this.dialog.open(ConfirmComponent);
  }
  closeSession():void{
    this.confirm("¡Un momento!", "¿Estás seguro que deseas cerrar sesión?", () => {
      localStorage.removeItem('token');
      localStorage.removeItem('start_session');
      localStorage.removeItem('finish_session');
      this.router.navigateByUrl('/login');
      this.dialog.closeAll();
    }, () => this.dialog.closeAll());
  }
}
