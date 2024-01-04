import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText',
  standalone: true
})
export class LongTextPipe implements PipeTransform {

  transform(value: string, maxLength: number = 20): unknown {
    return value.length > maxLength
      ? `${value.substring(0, maxLength)} ...`
      : value;
  }

}
