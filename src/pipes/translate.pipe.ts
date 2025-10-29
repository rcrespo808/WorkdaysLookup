import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // This allows the pipe to re-evaluate when the language changes
})
export class TranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);

  transform(key: string, params?: { [key: string]: any }): string {
    return this.i18n.translate(key, params);
  }
}
