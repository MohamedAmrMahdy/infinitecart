import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { MainStore } from '../../stores/main.store';
import { AuthStore } from '../../stores/auth.store';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CardModule, ButtonModule, RatingModule, CommonModule, FormsModule, BadgeModule ],
  providers: [MainStore, AuthStore],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  readonly mainStore = inject(MainStore);
  readonly authStore = inject(AuthStore);

  cart = this.mainStore.cart() as any
  currentUser = this.authStore.currentUser() as any;
  
  order: {
    id: number;
    user: any;
    items: any[]; 
    placedAt: number;
  } = { id: 1, user: null, items: [], placedAt: Date.now() }; 


itemOriginalPrice(item:any):number {
  return item.price;
}


itemPriceAfterDiscount(item:any):number {
  return  +((1-item.discount)* item.price).toFixed(2); 
}


itemTotalItemPrice(item:any):number {
  return  this.itemPriceAfterDiscount(item) * (item.quentity);
}


get orderTotalInitialPrice() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum += this.itemOriginalPrice(item) * (item.quentity);
  });
  return sum;
}

get orderTotalDiscount() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum = sum + ((this.itemOriginalPrice(item) - this.itemPriceAfterDiscount(item)) * item.quentity);
  });
  return sum;
}

get orderFinalPrice() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum += this.itemTotalItemPrice(item) ;
  });
  return sum;
}

  ngOnInit() {
    console.log(this.cart)
   this.order.id = 1;
   this.order.user = this.currentUser;
   this.order.placedAt = Date.now();
   this.order.items = [...this.cart.product];
   console.log(this.order)    
  }
  
//  order = {
//   id:13213456,
//   subTotal: 200,
//   discount: 0.2,
//   total: 150
//  }

//  item =  {
//   name: 'watch',
//   img: 'https://www.bootdey.com/image/380x380/008B8B/000000',  
//   price: 400,
//   quantity: 2,
//   total: 800,
//   rating: 4
// }

//   products =   [
//     1, 'Waterproof Mobile Phone', 'https://www.bootdey.com/image/380x380/008B8B/000000', 'Gray', 500, 450, 2
    
//   ];


  
}


