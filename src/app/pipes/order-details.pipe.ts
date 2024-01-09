import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderDetails',
  standalone: true
})
export class OrderDetailsPipe implements PipeTransform {

  transform(orderId: number, ...args: unknown[]): string {
    return `Order #${orderId} Details`;
  }

}
