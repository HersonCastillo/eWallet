import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html'
})
export class SimpleComponent {
  constructor(){}
  private static message: string;
  public getMessage():string{
    return SimpleComponent.message;
  }
  public static setMessage(msg: string): void{
    SimpleComponent.message = msg;
  }
}
