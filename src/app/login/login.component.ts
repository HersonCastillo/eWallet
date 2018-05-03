import { Component, OnInit } from '@angular/core';
import { MongoService } from "../mongo.service";

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mongo: MongoService) { }

  ngOnInit() {
    console.log('works');
    this.mongo.getUsuarios().then(r => {
      console.log(r);
    }).catch(err => {
      console.error(err);
    });
  }
  public insertUser(): void{
    console.log('Insertando usuario');
    this.mongo.setUsuario(Math.round(Math.random() * 100), "Mawio").then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    });
  }
}
