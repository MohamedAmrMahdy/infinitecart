import { MainStore } from './../../stores/main.store';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
export class CartComponent {
  constructor(private route : Router){}
  readonly store = inject(MainStore);

  user:any;
  cart= this.store.cart() as any;
  cartIems=this.store.cart().product;

  // delete - update

}
