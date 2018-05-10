import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent {
  constructor(private snack: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private descriptionRegExp = /^[a-zA-Z\s]{4,}$/gi
  public ingreso = {
    fecha: new Date(),
    monto: 0,
    motivo: ""
  };
  agregarEgreso(): void{
    if(!isNaN(this.ingreso.monto) && this.ingreso.monto > 0){
      let regexp = new RegExp(this.descriptionRegExp);
      if(regexp.exec(this.ingreso.motivo)){
        console.log('ok')
      } else this.snack.open("El motivo no debe estar vacío, contener números ni carácteres especiales.", null, {duration: 1500});
    } else this.snack.open("El monto no es válido, debe ser mayor de 0.", null, {duration:1500});
  }
}
