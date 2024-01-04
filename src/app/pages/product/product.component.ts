import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';

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
    CardModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  rating: number = 4;
  productId: number = 1;

  constructor(private myRoute:ActivatedRoute){
    this.productId = myRoute.snapshot.params['id']
  }
  ngOnInit(){
    console.log(this.productId)
  }
}
