import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, FormsModule,
  CheckboxModule,
  AccordionModule,
CardsComponent,
HttpClientModule,
DropdownModule],
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
  sorted = [{SORT:'PRICE: HIGH TO LOW'},{SORT:'PRICE: LOW TO HIGH'},{SORT:'BEST RATED'},{SORT:'RECOMMENDED'}];
  selectedSort:{SORT:String} = {SORT:''};

  constructor(private productService:ProductsService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data)=>{this.products = data},
      error:(e) => {console.log(e)}
    })
    this.route.queryParams
    // .filter(params=>params.category)
    .subscribe(params=>{
      // console.log(params);
      if(params['category'])
      {
        this.category = params['category'];
        this.filterForCategory();
      }
      if(params['brand'])
      {
        this.brand = params['brand'];
        this.filterForBrand();
      }
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

  onSortChange() {
    if (this.selectedSort.SORT === 'PRICE: LOW TO HIGH') {
      this.products.sort((a:any, b:any) => a.price - b.price);
    }else if (this.selectedSort.SORT === 'PRICE: HIGH TO LOW') {
      this.products.sort((a:any, b:any) => b.price - a.price);
    }else if (this.selectedSort.SORT === 'BEST RATED'){
      this.products.sort((a:any, b:any) => b.rating - a.rating);
    }else if(this.selectedSort.SORT === 'RECOMMENDED'){
      this.products.sort((a:any, b:any) => b.seller.sales - a.seller.sales);
    }
  }
}
