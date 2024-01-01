import { computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
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

    }
  }),
  withMethods(({ cart, ...store }) => ({
    refreshCart(newCart) {
      patchState(store, { cart: newCart });
    },
    resetCart() {
      patchState(store, { cart: {} });
      localStorage.removeItem('cart');
    },
    addToCart() {
      // TODO
      //patchState(store, { cart: {// TODO} });
    },
    removeFromCart(){
      // TODO
      //patchState(store, { cart: {// TODO} });
    }
  })),
  withHooks({
    onInit({ cart, refreshCart }) {
      if (!cart){
        let savedCart = JSON.parse(localStorage.getItem('cart') || "{}")
        if (savedCart){
          refreshCart(savedCart);
        }
      }
    },
  }),
);
