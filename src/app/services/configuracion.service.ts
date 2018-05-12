import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { Http } from '@angular/http';
import { Metodos } from '../interfaces/metodos';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  constructor(private http: Http, private globals: GlobalsService) { }
  guardarMetodo(nuevoMetodo: Metodos): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "agregarmetodo", nuevoMetodo)
      .subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  obtenerMetodos(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.put(this.globals.url + "metodos", {_id_:id})
      .subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  obtenerTiposMetodo(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.globals.url + "tiposmetodo")
      .subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  myInfo(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.put(this.globals.url + "info", {
        _id_: id
      }).subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  cambioCobro(id: string, idC: number): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.put(this.globals.url + "cambiarmetodo", {
        _id_: id,
        cobro: idC
      }).subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  eliminarMetodo(id: string, idM: number): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "eliminarmetodo", {
        _id_: id,
        index: idM
      }).subscribe(s => resolve(s.json()), err => reject(err));
    });
  }
}
