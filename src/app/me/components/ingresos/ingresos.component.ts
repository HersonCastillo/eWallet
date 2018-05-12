import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { IngresosService } from '../../../services/ingresos.service';
import { SimpleComponent } from '../../../modals/simple/simple.component';
import { ConfirmComponent } from '../../../modals/confirm/confirm.component';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  constructor(private snack: MatSnackBar, private conf: ConfiguracionService,
  private ingresosProvider: IngresosService, private dialog: MatDialog) { }
  private descriptionRegExp = /^[a-zA-Z\s\d]{4,}$/gi
  public ingreso = {
    fecha: new Date(),
    monto: 0,
    motivo: ""
  };
  public maxDate = new Date();
  public defaultPago:number = -1;
  public dataIngresos: Array<any> = [];
  public displayedColumns = ['fecha', 'monto', 'descripcion'];
  public dataSource = new MatTableDataSource<Element>();
  ngOnInit(): void{
    this.conf.myInfo(localStorage.getItem('key')).then(r => {
      this.defaultPago = r.data.cobro;
    });
    this.ingresosProvider.obtenerIngresos(localStorage.getItem('key')).then(r => {
      this.dataIngresos = r.data;
      this.dataSource = new MatTableDataSource(this.dataIngresos);
    });
  }
  getDate(e: any): string{
    let d: Date = new Date(e);
    let s: string = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return s;
  }
  makeSnack(msg: string, t?: number): void{
    this.snack.open(msg, null, {duration: t | 1500 });
  }
  agregarIngreso(): void{
    if(!isNaN(this.ingreso.monto) && this.ingreso.monto > 0){
      let regexp = new RegExp(this.descriptionRegExp);
      if(regexp.exec(this.ingreso.motivo)){
        if(this.defaultPago >= 0){
          if(this.ingreso.fecha){
            ConfirmComponent.setMessage("¡Espera!", 
            "¿Estás seguro de que quieres agregar este ingreso?", () => {
              this.ingresosProvider.nuevoIngreso({
                _id_: localStorage.getItem('key'),
                descripcion: this.ingreso.motivo,
                fecha: this.ingreso.fecha,
                monto: this.ingreso.monto,
                tipo: this.defaultPago
              }).then(r => {
                if(r.success) this.makeSnack("Ingreso agregado con éxito");
                this.ingreso.monto = 0;
                this.ingreso.motivo = "";
                this.ingreso.fecha = new Date();
                this.ingresosProvider.obtenerIngresos(localStorage.getItem('key')).then(r => {
                  this.dataIngresos = r.data;
                  this.dataSource = new MatTableDataSource(this.dataIngresos);
                });
              }).catch(() => {
                SimpleComponent.setMessage("¡Mal!", "No se pudo ejecutar el servicio.", f => this.dialog.closeAll());
                this.dialog.open(SimpleComponent);
              });
              this.dialog.closeAll();
            }, () => this.dialog.closeAll());
            this.dialog.open(ConfirmComponent);
          } else this.makeSnack("La fecha no es válida.");
        } else this.makeSnack("No se encontró un método de cobro válido.");
      } else this.makeSnack("El motivo no debe estar vacío, menor de 4 carácteres ni carácteres especiales.");
    } else this.makeSnack("El monto no es válido, debe ser mayor de 0.");
  }
}
