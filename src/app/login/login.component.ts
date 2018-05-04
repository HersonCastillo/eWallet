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

  ngOnInit() {}
}
