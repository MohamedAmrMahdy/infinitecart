import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

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
    PriceFormatPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  rating: number = 0;
  productId: number = 1;
  product: any;
  otherSellers: any;
  constructor(private myRoute:ActivatedRoute, private productsService:ProductsService, private router:Router){
    this.productId = myRoute.snapshot.params['id']
  }
  ngOnInit(){
    this.productsService.getProductById(this.productId).subscribe({
      next: response => {
        this.product = response;
        this.productsService.getProductsById(this.product[0].product.id).subscribe({
          next: response => {
            this.otherSellers = response;
          },
          error: err => {
            console.log(err);
          }
        });
      },
      error: err => {
        this.router.navigate(["/products"]);
        console.log(err);
      }
    });
  }
  goToProduct(id:number){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/products/"+id])});
  }
}
