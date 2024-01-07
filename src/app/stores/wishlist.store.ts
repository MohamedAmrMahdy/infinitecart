import {
  signalStore,
  withState,
  patchState,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';

export const WishlistStore = signalStore(
  withState({
    wishlist: {
      product:[] as any
    }
  }),
  withMethods(({ wishlist, ...store }) => ({
    refreshCart(newWishlist) {
      patchState(store, { wishlist: newWishlist });
    },
    resetCart() {
      patchState(store, { wishlist: {product:[]}
        }
      );
      localStorage.removeItem('wishlist');
    },


  })),
  withHooks({

  }),
);
