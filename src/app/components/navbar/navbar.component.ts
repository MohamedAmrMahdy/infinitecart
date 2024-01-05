import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
// Prime Modules
import { MenuItem } from "primeng/api";
// Prime UI Components
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
  providers:[AuthStore],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly store = inject(AuthStore)
  constructor(private productService:ProductsService){}
  guest:any;
  user=this.store.currentUser() as any;
  searchValue:any;
  value:any;
  products:IProduct[]=[];
  searchProduct:IProduct[]=[];
  product_search(){
    this.productService.getProducts1().subscribe(
      (data)=>{
        this.products=data
        console.log(this.products)
        for (let i = 0; i < this.products?.length; i++) {
          if(this.products[i]["product"].title.toLowerCase().includes(this.searchValue.toLowerCase())){
            console.log(true)
            this.searchProduct.push(this.products[i]),
            console.log(this.searchProduct)
          }
        }
      }
    )
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
  cartItems:{id:number,name:string,price:number,quantity:number,img:string}[] = [
    {
      id:1,
      name:"IPhone 11 pro Max 256 GB",
      img:"../../../assets/images cart/mobile.jpg",
      price:1_250,
      quantity:3
    },
    {
      id:2,
      name:"Electronic Device",
      img:"../../../assets/images cart/electronics.webp",
      price:7_250,
      quantity:1
    },
    {
      id:3,
      name:"T_Shirt",
      img:"../../../assets/images cart/men.webp",
      price:500,
      quantity:10
    },
    {
      id:4,
      name:"T_Shirt",
      img:"../../../assets/images cart/mobile.jpg",
      price:500,
      quantity:10
    },
    {
      id:5,
      name:"T_Shirt",
      img:"../../../assets/images cart/men.webp",
      price:500,
      quantity:10
    },
    {
      id:6,
      name:"T_Shirt",
      img:"../../../assets/images cart/men.webp",
      price:500,
      quantity:10
    },
  ]
  subtotal:any = this.getTotal();
  getTotal(){
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id <= 4)
        sum += +this.cartItems[i].price * this.cartItems[i].quantity
    }
    return sum;
  }

}


