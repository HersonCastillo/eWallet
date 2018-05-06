import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html'
})
export class SimpleComponent {
  constructor(){}
  private static message: string;
  private static title: string;

  private static func: Function;
  public getMessage():string{
    return SimpleComponent.message;
  }
  public getTitle():string{
    return SimpleComponent.title;
  }
  public Then(): void{
    SimpleComponent.func();
  }
  public static setMessage(title: string, msg: string, fs: Function): void{
    SimpleComponent.message = msg;
    SimpleComponent.title = title;
    SimpleComponent.func = fs;
  }
}
