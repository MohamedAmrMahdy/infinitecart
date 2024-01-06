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
  withMethods(({ cart, ...store }) => ({
    refreshCart(newCart) {
      patchState(store, { cart: newCart });
    },
    resetCart() {
      patchState(store, { cart: {product:[]}
        }
      );
      localStorage.removeItem('cart');
    },
    // addToCart(cart_item,quentity) {
    //   patchState(store, { cart:
    //       {
    //         product:{
    //           ...cart_item,
    //           quentity
    //         }
    //       }
    //   }
    //   );
    //   localStorage.setItem('cart',JSON.stringify({
    //     ...cart.product
    //   }));

    // },
    // removeFromCart(){
    //     patchState(store, { cart:
    //       {
    //         product: [{...cart.product}]
    //       }


    //     });
    //   }
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
