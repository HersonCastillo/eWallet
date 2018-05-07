import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  minDate = new Date(1975, 0, 1);
  maxDate = new Date(2005, 0, 1);
  constructor(private snack: MatSnackBar) { }
  isValid(object: any, str1: string, str2: string): boolean{
    return object.hasError(str1) && !object.hasError(str2);
  }
  isRequired(object: any): boolean{
    return object.hasError('required');
  }
  is(object: any, evl: string): boolean{
    return object.hasError(evl);
  }
  private patterns = {
    DUI: /^[\d]{8}-[\d]{1}$/gi,
    NIT: /^[\d]{4}-[\d]{6}-[\d]{3}-[\d]{1}$/gi,
    Telefono: /^[276][\d]{3}-?[\d]{4}$/g,
    Direccion: /^[a-zA-Z0-9\s#áéíóúÁÉÍÓÚ]{3,}$/
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  dui = new FormControl('', [Validators.required, Validators.pattern(this.patterns.DUI)]);
  nit = new FormControl('', [Validators.required, Validators.pattern(this.patterns.NIT)]);
  telefono = new FormControl('', [Validators.pattern(this.patterns.Telefono)]);
  calendario = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.pattern(this.patterns.Direccion)]);
  nombres = new FormControl('', [Validators.required]);
  apellidos = new FormControl('', [Validators.required]);
  contraFirst = new FormControl('', [Validators.required]);
  contraSecond = new FormControl('', [Validators.required]);

  public registroData = {
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    contra1: "",
    contra2: "",
    dui: "",
    nit: "",
    email: ""
  };

  btnRegistrar(): void{
    if(
      !this.email.hasError('required') &&
      !this.email.hasError('required') &&
      !this.dui.hasError('pattern') &&
      !this.dui.hasError('required') &&
      !this.nit.hasError('pattern') &&
      !this.nit.hasError('required') &&
      !this.contraFirst.hasError('required') &&
      !this.contraSecond.hasError('required') &&
      !this.nombres.hasError('required') &&
      !this.apellidos.hasError('required') &&
      !this.direccion.hasError('pattern') &&
      !this.telefono.hasError('pattern') &&
      !this.calendario.hasError('required')
    ){
      if(this.registroData.contra1 === this.registroData.contra2){
        console.log('Ward');
      } else this.snack.open("Las contraseñas no coinciden", null, {duration: 3500});
    } else this.snack.open("Tienes campos pendientes para rellenar.", null, {duration: 3000});
  }

  matcher = new MyErrorStateMatcher();
}
