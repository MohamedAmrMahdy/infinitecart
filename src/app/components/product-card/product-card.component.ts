import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { LongTextPipe } from '../../pipes/long-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { MainStore } from '../../stores/main.store';
import { RatingModule } from 'primeng/rating';
import { WishlistStore } from './../../stores/wishlist.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CardModule, ButtonModule, TagModule, CarouselModule, RatingModule, LongTextPipe, CurrencyPipe],
  providers: [MainStore, WishlistStore],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})

export class ProductCardComponent {
  @Input() product: any;
  readonly store = inject(MainStore);
  readonly wishlist = inject(WishlistStore)
  
  addToCart(item:any){
    let flag=true;
    this.store.cart().product.map((cartItem:any)=>{
      if(cartItem.id == item.id){
        flag = false;
        cartItem.count++;
      }
    })
    if(flag){
      this.store.cart().product.push({...item,count:1} as any);
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
  addOrRemoveWishlist(item:any){
    if(!this.isExist(item)){
      this.wishlist.wishlist().product.push({...item} as any);
      localStorage.setItem('wishlist',JSON.stringify(this.wishlist.wishlist().product))
    }
    else{
        this.wishlist.wishlist().product=this.wishlist.wishlist().product.filter((item2:any) => item.id != item2.id);
        localStorage.setItem('wishlist',JSON.stringify(this.wishlist.wishlist().product))
      }
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

