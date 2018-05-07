import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { GlobalsService } from './globals.service';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  constructor(private http: Http, private globals: GlobalsService) { }
  public ingresarUsuario(usuario: Usuario): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "nuevousuario", usuario)
      .subscribe(response => resolve(response), error => reject(error));
    });
  }
}