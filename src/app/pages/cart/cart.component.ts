import { MainStore } from './../../stores/main.store';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
  ],
  providers:[
    MainStore
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  readonly store = inject(MainStore);
  user:any;
  cartIems:any;
  ngOnInit(): void {
    this.cartIems=JSON.parse(localStorage.getItem('cart') || "");
  }

  // delete - update
  deleteFromCart(deleted:any){
    this.cartIems=this.cartIems.filter((item:any)=> deleted.id != item.id);
    localStorage.setItem('cart',JSON.stringify(this.cartIems))
  }
  increment(itemUpdate:any){
    this.cartIems.map((item:any)=> {
      if(item == itemUpdate && item.stock > item.quentity)
        item.quentity += 1
      return item;
    })
    localStorage.setItem('cart',JSON.stringify(this.cartIems))
  }
  decrement(itemUpdate:any){
    this.cartIems.map((item:any)=> {
      if(item == itemUpdate && item.quentity > 1 )
        item.quentity -= 1
      return item;
    })
    localStorage.setItem('cart',JSON.stringify(this.cartIems))
  }
  getTotal(){
    let sum = 0;
    for (let i = 0; i < this.cartIems.length; i++) {
      sum += +this.cartIems[i].price * +this.cartIems[i].quentity
    }
    return sum;
  }
}
