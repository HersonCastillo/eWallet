import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Ingresos } from '../interfaces/ingresos';
import { GlobalsService } from '../services/globals.service';
@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  constructor(private http: Http, private globals: GlobalsService) { }
  nuevoIngreso(ingreso: Ingresos): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "nuevoingreso", ingreso)
      .subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  obtenerIngresos(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "ingresos", {
        _id_: id
      }).subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
}
