import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent  {

  constructor() { }
  private static title: string;
  private static message: string;
  private static fs: Function;
  private static fe: Function;

  public getTitle(): string{
    return ConfirmComponent.title;
  }
  public getMessage(): string{
    return ConfirmComponent.message;
  }
  public Ok(): void{
    ConfirmComponent.fs();
  }
  public Cancel(): void{
    ConfirmComponent.fe();
  }
  public static setMessage(title: string, msg: string, fs: Function, fe: Function): void{
    ConfirmComponent.message = msg;
    ConfirmComponent.title = title;
    ConfirmComponent.fs = fs;
    ConfirmComponent.fe = fe;
  }
}
