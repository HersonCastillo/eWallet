import { Component, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfiguracionService } from '../../../services/configuracion.service';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{
  constructor(private snack: MatSnackBar, private conf: ConfiguracionService) { }
  ngOnInit(): void{
    //this.conf.obtenerMetodos(localStorage.getItem('key'));
    this.conf.obtenerTiposMetodo().then(r => {
      this.opcionesPago = r.data;
    });
    this.conf.myInfo(localStorage.getItem('key')).then(r => {
      this.defaultPago = r.data.cobro;
    });
  }
  makeSnack(txt: string): void{
    this.snack.open(txt, null, {duration: 1500});
  }
  cambiarDefault(e: any): void{
    let key = localStorage.getItem('key');
    this.conf.cambioCobro(key, e).then(r => {
      console.log(r)
    });
  }
  public tarjetaReg = /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/gi;
  public opcionesPago = [];
  public defaultPago = 3;
  public model = {
    cuenta: 0,
    tarjeta: "",
    monto: 0,
    _id_: localStorage.getItem('key')
  };
  public opcionesModel = 0;
  agregarMetodo(): void{
    if(this.model.monto > 0){
      switch(this.opcionesModel){
        case 0:{
          if(this.model.cuenta >= 1000 && this.model.cuenta <= 9999){
            this.conf.guardarMetodo({
              tipo: this.opcionesModel,
              monto: this.model.monto,
              numero: this.model.cuenta,
              _id_: this.model._id_
            });
          } else this.makeSnack("El número de cuenta debe ser de 4 dígitos significativos.");
          break;
        }
        case 1: case 2:{
          let reg = new RegExp(this.tarjetaReg);
          if(reg.exec(this.model.tarjeta)){
            this.conf.guardarMetodo({
              tipo: this.opcionesModel,
              monto: this.model.monto,
              _id_: this.model._id_,
              numero: this.model.tarjeta
            });
          } else this.makeSnack("El número de tarjeta no es válido.");
          break;
        }
      }
    } else this.makeSnack("El monto debe ser mayor de 0.");
  }
}
