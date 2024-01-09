import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order',
  standalone: true
})
export class OrderPipe implements PipeTransform {

  transform(orderId: number, ...args: unknown[]): string {
    return `#${orderId}`;

  }

}
