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
import { InputTextModule } from 'primeng/inputtext';
import { categoriesService } from '../../services/categories.service';
import { BrandsService } from '../../services/brands.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

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
    PaginatorModule,
    InputTextModule,
  ],
  providers:[ProductsService,categoriesService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  start: number=0;
  limit: number=10;
  prodNum: number=0;
  priceMin:number=0; //price ranges to select ranges from user to filter
  priceMax:number=999999999;
  seller:string = ''; //for select sellers and brands to filter
  brand:string = '';
  products:any;
  category:string = '';
  sortVal:string = '';
  allCategories?:any[];
  allBrands?:any[];
  sorted = [{SORT:'PRICE: HIGH TO LOW'},{SORT:'PRICE: LOW TO HIGH'},{SORT:'BEST RATED'},{SORT:'RECOMMENDED'}];
  selectedSort:{SORT:String} = {SORT:''};
  selectedCategory:{name:String} = {name:''};
  selectedBrand:{name:String} = {name:''};

  constructor(private productService:ProductsService, private route:ActivatedRoute, private router:Router, private categories:categoriesService,private brands:BrandsService){}

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
      next:(data:any)=>{
        this.prodNum = data.totalCountHeader;
        this.products = data;
      },
      error:(e) => {console.log(e)}
    })
  }

  ngOnInit(): void {
    this.categories.getCategories().subscribe({
      next:(data: any) => {this.allCategories = data},
      error: (e) => console.log(e)
    })
    this.brands.getBrands().subscribe({
      next: (data: any) => this.allBrands = data,
      error: (e) => console.log(e)
    })
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
    this.category = this.selectedCategory.name.toString();
    this.brand = this.selectedBrand.name.toString();
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
