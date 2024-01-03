import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, FormsModule,
  CheckboxModule,
  AccordionModule,
CardsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  priceRange1:number=0; //price ranges to select ranges from user to filter
  priceRange2:number=0;
  seller:string[] = ['']; //for select sellers and brands to filter
  brand:string[] = [''];

}
