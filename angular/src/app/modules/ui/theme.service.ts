import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  activeThem = new BehaviorSubject('oceanBlueThemProps');

  constructor() { }

  public getActiveTheme() {
    return this.activeThem;
  }

  public setActiveThem(name : string) {
    if(this.getActiveTheme().getValue() !== name){
      this.activeThem.next(name);
    }
  }
}
