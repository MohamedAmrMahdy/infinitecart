import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentThemeIndex = 0;
  private themeStyles = [
    'assets/lara-light-blue/theme.css',
    'assets/lara-dark-blue/theme.css'
  ];
  private currentThemeId = 'theme-stylesheet';

  constructor() {
    this.loadTheme(this.themeStyles[this.currentThemeIndex]);
  }

  toggleTheme(): void {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themeStyles.length;

    this.loadTheme(this.themeStyles[this.currentThemeIndex]);
  }

  private loadTheme(themeUrl: string): void {
    const existingThemeElement = document.getElementById(this.currentThemeId);
    if (existingThemeElement) {
      document.head.removeChild(existingThemeElement);
    }

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = themeUrl;
    linkElement.id = this.currentThemeId;

    document.head.appendChild(linkElement);
  }

}