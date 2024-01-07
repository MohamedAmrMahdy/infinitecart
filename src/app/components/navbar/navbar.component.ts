import { MainStore } from './../../stores/main.store';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AuthStore } from '../../stores/auth.store';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,
    DropdownModule,
    RouterModule,
    RouterLinkActive,
    InputTextModule,
    FormsModule,
    MenubarModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    OverlayPanelModule
  ],
  providers:[AuthStore,MainStore],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  readonly store = inject(AuthStore)
  readonly cart = inject(MainStore)
  constructor(private productService:ProductsService){}
  guest:any;
  user=this.store.currentUser() as any;
  searchValue:any;
  value:any;
  searchProduct:any;
  cartItems:any;

  getcartItems(){
    this.cartItems=JSON.parse(localStorage.getItem('cart') || "");
    return this.cartItems;
  }
  product_search(){
    this.productService.getAllProducts({
      limit: 3,
      titleLike: this.searchValue
    }).subscribe({
      next:(data)=>{
        this.searchProduct = data;
      },
      error:(e) => {console.log(e)}
    })
  }
  profile_img:any="";
  Mode:string="Dark";
  classIcon:string ="fa-moon";
  colorIcon:string ="white"
  changeTheme(){
    if(this.Mode == "Light"){
      this.Mode = "Dark";
      this.classIcon="fa-moon"
      this.colorIcon = "white"
    }else{
      this.Mode = "Light";
      this.classIcon="fa-sun"
      this.colorIcon="goldenrod"
    }
  }
  getTotal(){
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      // if(i >= 3)
      //   break;
      sum += +this.cartItems[i].price * +this.cartItems[i].quentity
    }
    return sum;
  }

}


