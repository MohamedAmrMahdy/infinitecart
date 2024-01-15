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
import { ThemeService } from '../../services/Theme.service';
import { WishlistStore } from '../../stores/wishlist.store';



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
  providers:[AuthStore,MainStore, ThemeService,WishlistStore],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  readonly store = inject(AuthStore)
  readonly cart = inject(MainStore)
  readonly wishlist = inject(WishlistStore)
  constructor(private productService:ProductsService, private themeService: ThemeService){}
  user=this.store.currentUser() as any;
  searchValue:any;
  searchProduct:any;
  cartItems:any;
  ngOnInit(): void {
    this.getcartItems();
    this.getWishlist();
  }
  getcartItems(){
    this.cartItems=JSON.parse(localStorage.getItem('cart') || "[]");
    this.cart.cart().product = this.cartItems;
    return this.cartItems;
  }
  getWishlist(){
    this.wishlist.wishlist().product = JSON.parse(localStorage.getItem('wishlist') || "[]");
  }
  product_search(search:any){
    this.searchValue = search.target.value;
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
  Mode:string="Dark";
  classIcon:string ="fa-moon";
  changeTheme(){
    this.themeService.toggleTheme();
    if(this.Mode == "Light"){
      this.Mode = "Dark";
      this.classIcon="fa-moon"
    }else{
      this.Mode = "Light";
      this.classIcon="fa-sun"
    }
  }
  getTotal(){
    return this.cart.getTotal();
  }
}
