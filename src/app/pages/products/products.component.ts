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
  seller:string[] = ['']; //for select sellers and brands to filter
  brand:string[] = [''];
  products:any;

  constructor(private productService:ProductsService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data)=>{this.products = data},
      complete:()=>{console.log(this.products)}
    })
  }
}
