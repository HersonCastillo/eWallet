import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RegistrarService } from '../services/registrar.service';

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
  constructor(private snack: MatSnackBar, private registrarProvider: RegistrarService,
  private router: Router) { }
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
    Direccion: /^[a-zA-Z0-9\s#áéíóúÁÉÍÓÚ]{3,}$/,
    Usuario: /^[a-zA-Z0-9]{6,}$/
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
  usuario = new FormControl('', [Validators.required, Validators.pattern(this.patterns.Usuario)]);

  public registroData = {
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    contra1: "",
    contra2: "",
    dui: "",
    nit: "",
    email: "",
    fechaNac: this.maxDate,
    usuario: ""
  };
  abecedario = "abcdefghijklmnopqrstuvwxyz";
  numeros = "0123456789";
  generateKey(): string{
    let firstKey:string = "";
    let secondKey:string = "";
    for(let i = 0; i < 9; i ++){
      let n = Math.round(Math.random() * 26);
      if(n >= 26) n = 0;
      firstKey += this.abecedario[n];
    }
    firstKey += ":";
    for(let i = 0; i < 9; i ++){
      let n = Math.round(Math.random() * 10);
      if(n >= 26) n = 0;
      firstKey += this.numeros[n];
    }
    for(let i = 0; i < 9; i ++){
      let n = Math.round(Math.random() * 26);
      if(n >= 26) n = 0;
      secondKey += this.numeros[n];
    }
    secondKey += ":";
    for(let i = 0; i < 9; i ++){
      let n = Math.round(Math.random() * 10);
      if(n >= 26) n = 0;
      secondKey += this.abecedario[n];
    }
    let d = new Date();
    let thirdKey = d.getMinutes() + '->' + d.getSeconds() + '->' + d.getMilliseconds();
    let hash = btoa(firstKey + ':' + secondKey + ':' + thirdKey);
    return hash;
  }
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
      !this.calendario.hasError('required') &&
      !this.usuario.hasError('required') &&
      !this.usuario.hasError('pattern')
    ){
      if(this.registroData.contra1 === this.registroData.contra2){
        this.registrarProvider.ingresarUsuario({
          _id_: this.generateKey(),
          nombres: this.registroData.nombres,
          apellidos: this.registroData.apellidos,
          password: this.registroData.contra1,
          dui: this.registroData.dui,
          nit: this.registroData.nit,
          fechaNacimiento: this.registroData.fechaNac,
          username: this.registroData.usuario,
          direccion: this.registroData.direccion,
          telefono: this.registroData.telefono
        }).then(response => {
          let ff = new Date();
          ff.setHours(ff.getHours() + 1);
          localStorage.setItem("start_session", (new Date).toString());
          localStorage.setItem("finish_session", ff.toString());
          localStorage.setItem("token", response.token); //Arreglar token - Reponse
          if(response.success){
            this.snack.open("Bienvenido a eWallet " + this.registroData.nombres, null, {duration: 4500});
            setTimeout(()=> {
              this.snack.open("Aqui podrás manejar tus gastos de una manera más fácil", null, {duration: 4500});
              setTimeout(()=> {
                this.snack.open("Mucha suerte y gracias por preferirnos.", null, {duration: 4500});
              }, 1500);
            }, 1500);
            this.router.navigateByUrl('/me');
          } else this.router.navigateByUrl('/me');
        }).catch(err => {
          this.snack.open("Error en el servicio de registro.", null, {duration: 4000});
        });
      } else this.snack.open("Las contraseñas no coinciden", null, {duration: 3500});
    } else this.snack.open("Tienes campos pendientes para rellenar.", null, {duration: 3000});
  }

  matcher = new MyErrorStateMatcher();
}
