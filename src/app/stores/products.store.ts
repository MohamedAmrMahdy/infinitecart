import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  patchState,
  withComputed,
  withMethods,
  withHooks,
} from '@ngrx/signals';
import { ProductsService } from '../services/products.service';

export const ProductsStore = signalStore(
  withState({
    products: {},
    productsFilters:{
      minPrice: null,
      maxPrice: null,
      category: '',
      brand: '',
      seller: '',
    }
  }),
  withComputed(({ products }) => ({
    listedProducts: computed(() => {
      // TODO
      return products
    }),
    watchedProducts: computed(() => {
      // TODO
      return products
    }),
    phonesProducts: computed(() => {
      // TODO
      return products
    }),
    hatsProducts: computed(() => {
      // TODO
      return products
    }),
  })),
  withMethods(({ products, productsFilters, ...store }) => ({
    // PRODUCTS
    refreshProducts() {
      // TODO
      //patchState(store, { products: {// TODO} });
    },
    addProduct() {
      // TODO
      //patchState(store, { products: {// TODO} });
    },
    removeProduct() {
      // TODO
      //patchState(store, { products: {// TODO} });
    },
    // PRODUCTS LIST COMPUTED
    resetProductsFilters() {
      patchState(store, { productsFilters: {
        minPrice: null,
        maxPrice: null,
        category: '',
        brand: '',
        seller: '',
      }});
    },
    updateProductsFilters(newProductsFilters) {
      patchState(store, { productsFilters: {
        minPrice: newProductsFilters.minPrice || productsFilters.minPrice,
        maxPrice: newProductsFilters.maxPrice || productsFilters.maxPrice,
        category: newProductsFilters.category || productsFilters.category,
        brand: newProductsFilters.brand || productsFilters.brand,
        seller: newProductsFilters.seller || productsFilters.seller,
      }});
    },
  })),
  withHooks({
    onInit(store) {
      const productsService = inject(ProductsService)
      productsService.getAllSellers().subscribe(res => {
        patchState(store,res)
      },)
      productsService.getAllListedProducts().subscribe(res => {
        patchState(store,res)
    },)

    productsService.getProducts().subscribe(res => {
      patchState(store,res)
  },)


    },
  }),
);
