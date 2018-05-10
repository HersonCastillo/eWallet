import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent{
  constructor() { }
  public tarjetaReg = /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/gi;
  public opcionesPago = [
    { tipo: "Cuenta bancaria", value: 0 },
    { tipo: "Tarjeta de crédito", value: 1 },
    { tipo: "Tarjeta de débito", value: 2 }
  ];
  public model = {
    cuenta: 0,
    tarjeta: "",
    monto: 0
  };
  public opcionesModel = 0;
  agregarMetodo(): void{
    switch(this.opcionesModel){
      case 0:{
        console.log('cuenta')
        break;
      }
      case 1: case 2:{
        console.log('tarjeta')
        break;
      }
    }
  }
}
