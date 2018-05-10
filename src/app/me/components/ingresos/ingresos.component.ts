import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {
  constructor(private snack: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private descriptionRegExp = /^[a-zA-Z\s]{4,}$/gi
  public ingreso = {
    fecha: new Date(),
    monto: 0,
    motivo: ""
  };
  agregarIngreso(): void{
    if(!isNaN(this.ingreso.monto) && this.ingreso.monto > 0){
      let regexp = new RegExp(this.descriptionRegExp);
      if(regexp.exec(this.ingreso.motivo)){
        console.log('ok')
      } else this.snack.open("El motivo no debe estar vacío, contener números ni carácteres especiales.", null, {duration: 1500});
    } else this.snack.open("El monto no es válido, debe ser mayor de 0.", null, {duration:1500});
  }
}
