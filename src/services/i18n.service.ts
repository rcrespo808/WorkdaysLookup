import { Injectable, signal, effect } from '@angular/core';
import { en } from '../i18n/en';
import { es } from '../i18n/es';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations: { [key: string]: any } = { en, es };
  
  currentLang = signal<string>('en');

  constructor() {
    const savedLang = localStorage.getItem('workingdays_lang');
    const browserLang = navigator.language.split('-')[0];
    
    if (savedLang && this.translations[savedLang]) {
      this.currentLang.set(savedLang);
    } else if (this.translations[browserLang]) {
      this.currentLang.set(browserLang);
    }

    // Effect to save language changes to localStorage
    effect(() => {
      localStorage.setItem('workingdays_lang', this.currentLang());
    });
  }

  setLanguage(lang: string) {
    if (this.translations[lang]) {
      this.currentLang.set(lang);
    }
  }

  translate(key: string, params: { [key: string]: any } = {}): string {
    const lang = this.currentLang();
    const keys = key.split('.');
    let result = this.translations[lang];

    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return key if translation not found
      }
    }

    if (typeof result === 'string') {
      return this.interpolate(result, params);
    }

    return key;
  }

  private interpolate(str: string, params: { [key: string]: any }): string {
    return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
      return params.hasOwnProperty(key) ? params[key] : match;
    });
  }
}
