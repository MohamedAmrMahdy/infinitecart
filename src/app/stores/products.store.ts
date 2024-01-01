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

export const ProductsStore = signalStore(
  withState({ myVariable: 0 }),
  // withComputed(({ myVariable }) => ({
  //   doubleMyVariable: computed(() => myVariable() * 2),
  // })),
  // withMethods(({ myVariable, ...store }) => ({
  //   increment() {
  //     patchState(store, { myVariable: myVariable() + 1 });
  //   },
  //   decrement() {
  //     patchState(store, { myVariable: myVariable() - 1 });
  //   },
  //   reset(){
  //     patchState(store, { myVariable: 0 });
  //   }
  // })),
  // withHooks({
  //   onInit({ increment }) {
  //     interval(1_000)
  //       .pipe(takeUntilDestroyed())
  //       .subscribe(() => increment());
  //   },
  //   onDestroy({ myVariable }) {
  //     console.log('count on destroy', myVariable());
  //   },
  // }),
);
