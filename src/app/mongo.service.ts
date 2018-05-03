import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MongoService {
    constructor(private http: HttpClient) { }
    public getUsuarios(): Promise<any>{
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3500/usuarios')
            .subscribe(r => {
              resolve(r);
            }, err =>{
              reject(err);
            });
        });
    }
    public setUsuario(id: number, nombre: string): Promise<any>{
      return new Promise((resolve, reject) => {
          this.http.post('http://localhost:3500/nuevousuario', {
              id: id,
              nombre: nombre
          })
          .subscribe(r => {
            resolve(r);
          }, err => {
            reject(err);
          });
      });
    }
}