import { MainStore } from './../../stores/main.store';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
  ],
  providers:[
    MainStore,
    OrdersService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private orderService:OrdersService){}
  readonly store = inject(MainStore);
  user:any;
  cartItems:any;
  ngOnInit(): void {
    
  }
  getCart(){
    this.store.cart().product=JSON.parse(localStorage.getItem('cart') || "[]");
    this.cartItems = this.store.cart().product;
    return this.store.cart().product;
  }

  // delete - update
  deleteFromCart(deleted:any){
    this.cartItems=this.cartItems.filter((item:any)=> deleted.id != item.id);
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }
  increment(itemUpdate:any){
    this.cartItems.map((item:any)=> {
      if(item == itemUpdate && item.stock > item.quentity)
        item.quentity += 1
      return item;
    })
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }
  decrement(itemUpdate:any){
    this.cartItems.map((item:any)=> {
      if(item == itemUpdate && item.quentity > 1 )
        item.quentity -= 1
      return item;
    })
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }
  getTotal(){
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += +this.cartItems[i].price * +this.cartItems[i].count
    }
    return sum;
  }
  postOrder(){
    this.orderService.AddOrder(this.store.cart().product).subscribe();
    this.store.resetCart();   
  }
}
