import { Component, Inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material';
import { SimpleComponent } from '../modals/simple/simple.component';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginProvider: LoginService, private dialog: MatDialog, 
  private router: Router) {}
  openDialog(title: string, message: string, fs: Function): void{
    SimpleComponent.setMessage(title, message, fs);
    this.dialog.open(SimpleComponent);
  }
  public user = {
    username: "",
    password: ""
  };
  public loading: boolean = false;
  public btnLogin(): void{
    this.loading = true;
    this.loginProvider.login(this.user.username, this.user.password).then(response => {
      if(response.error) this.openDialog("¡Ups!", response.error, () => this.dialog.closeAll());
      else if(response.success){
        this.router.navigateByUrl('/me');
        localStorage.setItem("token", response.data);
        localStorage.setItem("start_session", (new Date()).toString());
        let last = new Date();
        last.setHours(last.getHours() + 1);
        localStorage.setItem("finish_session", last.toString());
      }
      else this.openDialog("Mmm...", "Algo malo ocurrió, intenta más tarde.", () => this.dialog.closeAll());
      this.loading = false;
    }).catch(error => {
      this.openDialog("¡Mal!", "Ocurrió un error al ejecutar el servicio.", () => this.dialog.closeAll());
      this.loading = false;
    });
  }
}