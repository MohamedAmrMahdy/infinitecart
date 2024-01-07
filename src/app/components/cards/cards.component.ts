import { WishlistStore } from './../../stores/wishlist.store';
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
providers: [MainStore,WishlistStore],

  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() productData:any;
  readonly store = inject(MainStore);
  readonly wishlist = inject(WishlistStore)

  addToCart(item:any){
    let flag=true;
    this.store.cart().product.map((cartItem:any)=>{
      if(cartItem.id == item.id)
        flag = false;
    })
    if(flag){
      this.store.cart().product.push({...item,quentity:1} as any);
    }
    localStorage.setItem('cart',JSON.stringify(this.store.cart().product))
  }
  isExist(item:any){
    let flag=false;
    this.wishlist.wishlist().product.map((WishlistItem:any)=>{
      if(WishlistItem.id == item.id)
        flag = true;
    })
    return flag;
  }
  addWishlist(item:any){
    if(!this.isExist(item)){
      this.wishlist.wishlist().product.push({...item} as any);
      localStorage.setItem('wishlist',JSON.stringify(this.wishlist.wishlist().product))
    }
    else{
        this.wishlist.wishlist().product=this.wishlist.wishlist().product.filter((item2:any) => item.id != item2.id);
        localStorage.setItem('wishlist',JSON.stringify(this.wishlist.wishlist().product))
      }
    }
}
