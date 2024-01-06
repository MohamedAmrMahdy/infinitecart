import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { LongTextPipe } from '../../pipes/long-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { MainStore } from '../../stores/main.store';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CardModule, ButtonModule, TagModule, CarouselModule, LongTextPipe, CurrencyPipe],
  providers: [MainStore],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})

export class ProductCardComponent {
  @Input() product: any;
  readonly store = inject(MainStore);

  addToCart(item: any) {
    this.store.cart().product.push({ ...item, quentity: 1 } as any);
    localStorage.setItem('cart', this.store.cart().product)
  }

  getStock(num: number) {
    if (num <= 0)
      return "Out of Stock"
    else if (num < 300)
      return "Low Stock"
    else
      return "In Stock"
  }

  getSeverity(num: number) {
    if (num <= 0)
      return "danger"
    else if (num < 300)
      return "warning"
    else
      return "info"
  }

  disableChk(num: number) {
    if (num <= 0)
      return true;
    else
      return false;
  }

}

