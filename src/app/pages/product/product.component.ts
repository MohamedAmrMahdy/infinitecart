import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { MainStore } from '../../stores/main.store';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,

    FieldsetModule,
    RatingModule,
    AvatarModule,
    TagModule,
    ButtonModule,
    CardModule,
    PanelModule,
    BreadcrumbModule,
    PriceFormatPipe
  ],
  providers:[MainStore],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  rating: number = 0;
  productId: number = 1;
  product: any;
  otherSellers: any;

  constructor(
    private myRoute:ActivatedRoute,
    private productsService:ProductsService,
    private router:Router
  ){}

  ngOnInit(){
    this.myRoute.paramMap.subscribe(params=>{
      this.productId = this.myRoute.snapshot.params['id']

      this.productsService.getAllProducts({
        limit: 1,
        productId: this.productId,
      }).subscribe({
        next:(data)=>{
          this.product = data;
          if (this.product.length > 0){
            this.productsService.getAllProducts({
              metaId: this.product[0].product.id,
            }).subscribe({
              next: response => {
                this.otherSellers = response;
              },
              error: err => {
                this.router.navigate(["/products"]);
                console.log(err);
              }
            });
          }else{
            this.router.navigate(["/products"]);
          }
        },
        error:(e) => {
          this.router.navigate(["/products"]);
          console.log(e)
        }
      })
    })
  }

  goToProduct(id:number){
    this.router.navigate(["/products/"+id]);
  }

  readonly store = inject(MainStore);

  addToCart(item:any){
    this.store.cart().product.push({...item,quentity:1} as any);
    localStorage.setItem('cart',this.store.cart().product)
  }
}
