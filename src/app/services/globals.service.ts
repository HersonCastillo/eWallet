import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  constructor() { }
  public url = "http://localhost:3500/";
}
