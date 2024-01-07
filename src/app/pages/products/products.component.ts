import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AccordionModule,
    CardsComponent,
    HttpClientModule,
    DropdownModule
  ],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  limit: number=100;
  priceMin:number=0; //price ranges to select ranges from user to filter
  priceMax:number=999999999;
  seller:string = ''; //for select sellers and brands to filter
  brand:string = '';
  products:any;
  category:string = '';
  sorted = [{SORT:'PRICE: HIGH TO LOW'},{SORT:'PRICE: LOW TO HIGH'},{SORT:'BEST RATED'},{SORT:'RECOMMENDED'}];
  selectedSort:{SORT:String} = {SORT:''};

  constructor(private productService:ProductsService, private route:ActivatedRoute, private router:Router){}

  renderProducts(){
    this.productService.getAllProducts({
      limit: this.limit,
      categoryLike: this.category,
      brandLike: this.brand,
      sellerLike: this.seller,
      minPrice: this.priceMin,
      maxPrice: this.priceMax,
    }).subscribe({
      next:(data)=>{
        this.products = data;
      },
      error:(e) => {console.log(e)}
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      if(params['category']) this.category = params['category'];
      if(params['brand']) this.brand = params['brand'];
      if(params['seller']) this.seller = params['seller'];
      if(params['min']) this.priceMin = params['min'];
      if(params['max']) this.priceMax = params['max'];
      if(params['limit']) this.limit = params['limit'];
      this.renderProducts()
    })
  }

  filterProducts(){
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          category: this.category,
          brand: this.brand,
          min: this.priceMin,
          max: this.priceMax,
          limit: this.limit,
        },
        queryParamsHandling: 'merge'
      }
    );
    this.renderProducts()
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
