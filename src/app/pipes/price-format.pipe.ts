import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number, localeCode: string = 'en-US'): unknown {
    return value.toLocaleString(localeCode);
  }

}
