import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../modals/confirm/confirm.component';
import { SimpleComponent } from '../../../modals/simple/simple.component';
import { ConfiguracionService } from '../../../services/configuracion.service';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{
  constructor(
    private snack: MatSnackBar, 
    private conf: ConfiguracionService,
    private dialog: MatDialog) { }
  ngOnInit(): void{
    this.conf.obtenerMetodos(localStorage.getItem('key')).then(r => {
      this.mismetodos = r.data;
    }).catch(() => {
      SimpleComponent.setMessage("¡Mal!", "El servicio no funciona, intenta más tarde.", () => {
        this.dialog.closeAll();
      });
      this.dialog.open(SimpleComponent);
    });
    this.conf.obtenerTiposMetodo().then(r => {
      this.opcionesPago = r.data;
    }).catch(() => {
      SimpleComponent.setMessage("¡Mal!", "El servicio no funciona, intenta más tarde.", () => {
        this.dialog.closeAll();
      });
      this.dialog.open(SimpleComponent);
    });
    this.conf.myInfo(localStorage.getItem('key')).then(r => {
      this.defaultPago = r.data.cobro;
    }).catch(() => {
      SimpleComponent.setMessage("¡Mal!", "El servicio no funciona, intenta más tarde.", () => {
        this.dialog.closeAll();
      });
      this.dialog.open(SimpleComponent);
    });
  }
  quit(e: any): void{
    if(e !== this.defaultPago){
      ConfirmComponent.setMessage("¡Espera un momento!", "¿Estás seguro de que deseas borrar este elemento?", () => {
        this.conf.eliminarMetodo(localStorage.getItem('key'), e).then(r => {
          if(r.success) this.makeSnack("Método eliminado con éxito.");
          this.ngOnInit();
        });
        this.dialog.closeAll();
      }, () => this.dialog.closeAll());
      this.dialog.open(ConfirmComponent);
    } else this.makeSnack("No puedes eliminar el método que posees por defecto.");
  }
  itsSame(code: number): boolean{
    let result: boolean = false;
    this.mismetodos.forEach(e => {
      if(e.tipo === code){
        result = true;
        return;
      }
    });
    return result;
  }
  makeSnack(txt: string): void{
    this.snack.open(txt, null, {duration: 1500});
  }
  cambiarDefault(e: any): void{
    let key = localStorage.getItem('key');
    this.conf.cambioCobro(key, e).then(r => {
      if(r.success) this.makeSnack("Método cambiado con éxito.");
    });
  }
  public tarjetaReg: any = /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/gi;
  public opcionesPago: Array<any> = [];
  public mismetodos: Array<any> = [];
  public defaultPago: number = 3;
  public model: any = {
    cuenta: 0,
    tarjeta: "",
    monto: 0,
    _id_: localStorage.getItem('key')
  };
  public opcionesModel = -1;
  agregarMetodo(): void{
    if(this.opcionesModel === -1){
      this.makeSnack("No se ha elegido un tipo de gasto válido.");
      return;
    }
    if(this.model.monto > 0){
      switch(this.opcionesModel){
        case 0:{
          if(this.model.cuenta >= 1000 && this.model.cuenta <= 9999){
            this.conf.guardarMetodo({
              tipo: this.opcionesModel,
              monto: this.model.monto,
              numero: this.model.cuenta,
              _id_: this.model._id_
            }).then(r => {
              if(r.success){
                this.makeSnack(r.success);
                this.ngOnInit();
              }
              else if(r.error) this.makeSnack(r.error);
              this.model.monto = 0;
              this.model.cuenta = 0;
              this.model.tarjeta = "";
            }).catch(e => {
              this.makeSnack("No se pudo agregar el método debido al servicio.");
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
            }).then(r => {
              if(r.success){
                this.makeSnack(r.success);
                this.ngOnInit();
              }
              else if(r.error) this.makeSnack(r.error);
              this.model.monto = 0;
              this.model.cuenta = 0;
              this.model.tarjeta = "";
            }).catch(e => {
              this.makeSnack("No se pudo agregar el método debido al servicio.");
            });
          } else this.makeSnack("El número de tarjeta no es válido.");
          break;
        }
        case 3: {
          this.conf.guardarMetodo({
            tipo: this.opcionesModel,
            monto: this.model.monto,
            numero: null,
            _id_: this.model._id_
          }).then(r => {
            if(r.success){
              this.makeSnack(r.success);
              this.ngOnInit();
            }
            else if(r.error) this.makeSnack(r.error);
            this.model.monto = 0;
            this.model.cuenta = 0;
            this.model.tarjeta = "";
          }).catch(e => {
            this.makeSnack("No se pudo agregar el método debido al servicio.");
          });
          break;
        }
        default:
          this.makeSnack("No se ha elegido un tipo de gasto válido.");
          break;
      }
    } else this.makeSnack("El monto debe ser mayor de 0.");
  }
}
