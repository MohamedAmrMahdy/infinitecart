import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { MainStore } from '../../stores/main.store';
import { AuthStore } from '../../stores/auth.store';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { OrderPipe } from '../../pipes/order.pipe';

import { NgxPayPalModule } from 'ngx-paypal';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

interface TimeLine {
  placed: number;
  inTransit: number;
  outForDelivery: number;
  delivered: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CardModule, ButtonModule, RatingModule, CommonModule, FormsModule,
     BadgeModule, PriceFormatPipe, OrderPipe, NgxPayPalModule ],
  providers: [MainStore, AuthStore],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})



export class CheckoutComponent {
  constructor(private http: HttpClient,private router: Router,private ordersService: OrdersService){}
  readonly mainStore = inject(MainStore);
  readonly authStore = inject(AuthStore);

  cart = this.mainStore.cart() as any
  currentUser = this.authStore.currentUser() as any;


  order: {
    id: number;
    user: any;
    items: any[];
    total: number;
    timeline: TimeLine;
  } = {
    id: 1, user: null, items: [],
    total: 0,
    timeline: { placed: 0, inTransit: 0, outForDelivery: 0, delivered: 0 }
  };


itemOriginalPrice(item:any):number {
  return item.item.price;
}


itemPriceAfterDiscount(item:any):number {
  return  +((1-item.item.discount)* item.item.price).toFixed(2);
}


itemTotalPrice(item:any):number {
  return  this.itemPriceAfterDiscount(item) * (item.count);
}


get orderTotalInitialPrice() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum += (this.itemOriginalPrice(item) * item.count);
  });
  return sum;
}

get orderTotalDiscount() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum = sum + ((this.itemOriginalPrice(item) - this.itemPriceAfterDiscount(item)) * item.count);
  });
  return sum;
}

get orderFinalPrice() {
  let sum = 0;
  this.order.items.forEach(item => {
    sum += this.itemTotalPrice(item) ;
  });
  return sum;
}

public payPalConfig ? : IPayPalConfig;
paypalItems:any;

  ngOnInit() {
   console.log('this.cart', this.cart)
   this.order.id = Math.floor(Math.random() * (99999999 - 1 + 1)) + 1;
   this.order.user = this.currentUser;
  //  this.order.timeline.placed = Date.now();
   this.order.items = this.cart.product.map((product: any) => {
    return {
      count: product.count,
      item: product
    }
   });
   this.order.total = this.orderFinalPrice;
   this.order.timeline.placed = Date.now();
  //  console.log('this.order', this.order)
  //  console.log('this.currentUser',this.currentUser);
  this.paypalItems = this.cart.product.map((item:any) => {
    return {
      name: item.product.title,
      category: 'PHYSICAL_GOODS',
      quantity: item.count,
      unit_amount: {
        currency_code: 'USD',
        value: +((1-item.discount)* item.price).toFixed(2)
      }
    };
  });
  console.log(this.paypalItems);
  this.initConfig();
  }
  
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AVBGWP_B4FfXm6Gf_CfzbukkymCvBcPficyj92l8EKEL334SK2UCyX1CIHB1RDRuGtT17LNx-D9qfB1X',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: ''+this.orderFinalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: ''+this.orderFinalPrice.toFixed(2)
              }
            }
          },
          items: this.paypalItems
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      // console.log('onApprove - transaction was approved, but not authorized', data, actions);
      // actions.order.get().then(details => {
      //   console.log('onApprove - you can get full order details inside onApprove: ', details);
      // });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.AddOrder2();
    },
    onCancel: (data, actions) => {
      // console.log('OnCancel', data, actions);
    },
    onError: err => {
      // console.log('OnError', err);
    },
    onClick: (data, actions) => {
      // console.log('onClick', data, actions);
    },
  };
  }

  AddOrder(event:any) {
    this.ordersService.AddOrder(this.order).subscribe({
      next: (response:any) => {
        console.log('response', response);
        this.mainStore.resetCart();
        this.router.navigate(["/profile/orders"]);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  AddOrder2() {
    this.ordersService.AddOrder(this.order).subscribe({
      next: (response:any) => {
        console.log('response', response);
        this.mainStore.resetCart();
        this.router.navigate(["/profile/orders"]);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
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


