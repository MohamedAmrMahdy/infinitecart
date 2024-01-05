import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, FormsModule,
  CheckboxModule,
  AccordionModule,
CardsComponent,
HttpClientModule],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  priceRange1:number=0; //price ranges to select ranges from user to filter
  priceRange2:number=0;
  seller:string = ''; //for select sellers and brands to filter
  brand:string = '';
  products:any;
  category:string = '';

  constructor(private productService:ProductsService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data)=>{this.products = data},
      error:(e) => {console.log(e)}
    })
  }

  filterForPrice(){
    this.productService.getProductsByPrice(this.priceRange1,this.priceRange2).subscribe({
      next:(data) => {this.products = data},
      error:(e) => {console.log(e)}
    })
  }

  filterForCategory(){
    this.productService.getAllProductsByCategory(this.category).subscribe({
      next:(data) => {this.products = data},
      error:(e) => {console.log(e)}
    })
  }

  filterForBrand(){
    this.productService.getProductsByBrand(this.brand).subscribe({
      next:(data) => {this.products = data},
      error:(e) => {console.log(e)}
    })
  }

  filterForSeller(){
    this.productService.getProductsBySeller(this.seller).subscribe({
      next:(data) => {this.products = data},
      error:(e) => {console.log(e)}
    })
  }
}
