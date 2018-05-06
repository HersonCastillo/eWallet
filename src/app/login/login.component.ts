import { Component, Inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material';
import { SimpleComponent } from '../modals/simple/simple.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginProvider: LoginService, private dialog: MatDialog) { }
  openDialog(message: string): void{
    SimpleComponent.setMessage(message);
    this.dialog.open(SimpleComponent);
  }
  public user = {
    username: "",
    password: ""
  };
  public btnLogin(): void{
      this.loginProvider.login(this.user.username, this.user.password).then(response => {
        console.log(response)
      }).catch(error => {
        console.error(error);
      });
  }
}