import { MainStore } from './../../stores/main.store';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
  ],
  providers:[
    MainStore,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private router: Router){}
  readonly store = inject(MainStore);
  user:any;
  cartItems:any;
  counter:number = 0;
  ngOnInit(): void {
  }
  getCart(){
    this.store.cart().product=JSON.parse(localStorage.getItem('cart') || "[]");
    this.cartItems = this.store.cart().product;
    return this.store.cart().product;
  }

  deleteFromCart(deleted:any){
    this.store.removeFromCart(deleted);
  }
  increment(updatedItem:any){
    this.store.increment(updatedItem);
  }
  decrement(updatedItem:any){
    this.store.decrement(updatedItem)
  }
  getTotal(){
    return this.store.getTotal();
  }
  getItemsNumber(){
    return this.store.getTotalNumberOfItems();
  }
  postOrder(){
    this.router.navigate(['/checkout'])
  }
}
