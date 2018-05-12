import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { EgresosService } from '../../../services/egresos.service';
import { SimpleComponent } from '../../../modals/simple/simple.component';
import { ConfirmComponent } from '../../../modals/confirm/confirm.component';
@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {
  constructor(private snack: MatSnackBar,
  private conf: ConfiguracionService,
  private egresosProvider: EgresosService,
  private dialog: MatDialog) { }
  private descriptionRegExp = /^[a-zA-Z\s\d]{4,}$/gi
  public ingreso = {
    fecha: new Date(),
    monto: 0,
    motivo: ""
  };
  public maxDate = new Date();
  private defaultPago:number = -1;
  public dataEgresos: Array<any> = [];
  public displayedColumns = ['fecha', 'monto', 'descripcion'];
  public dataSource = new MatTableDataSource<Element>();
  ngOnInit(): void{
    this.conf.myInfo(localStorage.getItem('key')).then(r => {
      this.defaultPago = r.data.cobro;
    });
    this.egresosProvider.obtenerEgresos(localStorage.getItem('key')).then(r => {
      this.dataEgresos = r.data;
      this.dataSource = new MatTableDataSource(this.dataEgresos);
    });
  }
  getDate(e: any): string{
    let d: Date = new Date(e);
    let s: string = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return s;
  }
  makeSnack(msg: string, t?: number): void{
    this.snack.open(msg, null, {duration: t | 1500});
  }
  agregarEgreso(): void{
    if(!isNaN(this.ingreso.monto) && this.ingreso.monto > 0){
      let regexp = new RegExp(this.descriptionRegExp);
      if(regexp.exec(this.ingreso.motivo)){
        if(this.defaultPago >= 0){
          if(this.ingreso.fecha){
            ConfirmComponent.setMessage("¡Espera!",
            "¿Estás seguro de que quieres agregar este egreso?", () => {
              this.egresosProvider.nuevoEgreso({
                _id_: localStorage.getItem('key'),
                descripcion: this.ingreso.motivo,
                fecha: this.ingreso.fecha,
                monto: this.ingreso.monto,
                tipo: this.defaultPago
              }).then(r => {
                if(r.success) this.makeSnack("Egreso agregado con éxito");
                this.ingreso.monto = 0;
                this.ingreso.motivo = "";
                this.ingreso.fecha = new Date();
                this.egresosProvider.obtenerEgresos(localStorage.getItem('key')).then(r => {
                  this.dataEgresos = r.data;
                  this.dataSource = new MatTableDataSource(this.dataEgresos);
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
