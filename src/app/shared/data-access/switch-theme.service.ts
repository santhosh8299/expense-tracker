import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchThemeService {
  document = inject(DOCUMENT);
  constructor() { }

  switchTheme(theme: string){
    (this.document.getElementById('app-theme') as HTMLLinkElement).href = theme + '.css';
  }
}
