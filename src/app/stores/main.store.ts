import { computed } from '@angular/core';
import {
  signalStore,
  withState,
  patchState,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';

export const MainStore = signalStore(
  withState({
    cart: {
      product:[] as any
    }
  }),
  withComputed( ({cart}) => ({
    getTotal: computed(() => {
        let sum = 0;
        cart().product.forEach((product: {count : number,price : number}) => {
          sum += product.count * product.price;
        });
      return sum;
    }),
    getTotalNumberOfItems: computed(()=> {
      let counter = 0;
      cart().product.forEach((item:{count : number})=> {
          counter += item.count
        });
      return counter;
    }),
  })
  ),

  withMethods(({ cart, ...store }) => ({
    refreshCart(newCart) {
      if(newCart.length > 0)
        patchState(store, { cart:  {product: newCart}});
    },
    resetCart() {
      patchState(store, { cart: {product:[]}
        }
      );
      localStorage.removeItem('cart');
    },
    addToCart(cart_item) {
      let flag = true;
      let newCart = JSON.parse(localStorage.getItem('cart') || "[]");
      newCart.map((cartItem:any)=>{
        if(cartItem.id == cart_item.id){
          flag = false;
          cartItem.count++;
        }
      })
      if(flag)
        newCart.push({...cart_item,count:1} as any);
      patchState(store, {
        cart:{
          product: newCart
        }
      });
      localStorage.setItem('cart',JSON.stringify(cart().product));
    },

    removeFromCart(item){
      let newCart = cart().product.filter((cartItem:any) => item.id != cartItem.id);
      patchState(store, {
        cart:{
          product: newCart
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart().product))
    },

    increment(updatedItem){
      let newCart = cart().product.map((item:any)=> {
        if(item.id == updatedItem.id && item.stock > item.count)
          item.count += 1
        return item;
      })
      patchState(store, {
        cart:{
          product: newCart
        }
      });
      localStorage.setItem('cart',JSON.stringify(newCart))
    },
    decrement(updatedItem){
      let newCart = cart().product.map((item:any)=> {
        if(item.id == updatedItem.id && item.count > 1 )
            item.count -= 1
        return item;
      })
      patchState(store, {
        cart:{
          product: newCart
        }
      });
      localStorage.setItem('cart',JSON.stringify(newCart))
    },
  })),
  withHooks({
    onInit({ refreshCart }) {
      let savedCart = JSON.parse(localStorage.getItem('cart') || "{}")
      refreshCart(savedCart);
    },
  }),
);
