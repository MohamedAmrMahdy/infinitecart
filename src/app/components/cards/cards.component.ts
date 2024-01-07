import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainStore } from '../../stores/main.store';
import { IProduct } from '../../interfaces/product';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    RatingModule,
  CommonModule,
FormsModule,
RouterModule],
providers: [MainStore],

  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() productData:any;
  readonly store = inject(MainStore);

  addToCart(item:any){
    this.store.cart().product.push({...item,quentity:1} as any);
    localStorage.setItem('cart',JSON.stringify(this.store.cart().product))
  }
}
