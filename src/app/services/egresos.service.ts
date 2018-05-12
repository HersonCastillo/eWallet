import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Egresos } from '../interfaces/egresos';
import { GlobalsService } from '../services/globals.service';
@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  constructor(private http: Http, private globals: GlobalsService) { }
  nuevoEgreso(egreso: Egresos): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "nuevoegreso", egreso)
      .subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
  obtenerEgresos(id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.globals.url + "egresos", {
        _id_:id
      }).subscribe(r => resolve(r.json()), err => reject(err));
    });
  }
}
