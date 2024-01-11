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
import { PaginatorModule } from 'primeng/paginator';

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
    DropdownModule,
    PaginatorModule
  ],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  start: number=0;
  limit: number=10;
  priceMin:number=0; //price ranges to select ranges from user to filter
  priceMax:number=999999999;
  seller:string = ''; //for select sellers and brands to filter
  brand:string = '';
  products:any;
  category:string = '';
  sortVal:string = '';
  sorted = [{SORT:'PRICE: HIGH TO LOW'},{SORT:'PRICE: LOW TO HIGH'},{SORT:'BEST RATED'},{SORT:'RECOMMENDED'}];
  selectedSort:{SORT:String} = {SORT:''};

  constructor(private productService:ProductsService, private route:ActivatedRoute, private router:Router){}

  renderProducts(){
    this.productService.getAllProducts({
      start: this.start,
      limit: this.limit,
      categoryLike: this.category,
      brandLike: this.brand,
      sellerLike: this.seller,
      minPrice: this.priceMin,
      maxPrice: this.priceMax,
      sorting: this.sortVal,
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
      if(params['min']) this.priceMin = Number(params['min']);
      if(params['max']) this.priceMax = Number(params['max']);
      if(params['start']) this.start = Number(params['start']);
      if(params['limit']) this.limit = Number(params['limit']);
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
    scrollTo(0, 0);
  }

  onSortChange() {
    this.sortVal = this.selectedSort.SORT.toString();
    this.renderProducts();
  }
  onPageChange(event: any){
    this.start = event.first
    this.limit = event.rows
    this.renderProducts()
    scrollTo(0, 0);
  }
}
