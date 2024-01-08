import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CardModule, ButtonModule, RatingModule, CommonModule, FormsModule, BadgeModule ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
 order = {
  id:13213456,
  subTotal: 200,
  discount: 0.2,
  total: 150
 }

 item =  {
  name: 'watch',
  img: 'https://www.bootdey.com/image/380x380/008B8B/000000',  
  price: 400,
  quantity: 2,
  total: 800,
  rating: 4
}

  products =   [
    1, 'Waterproof Mobile Phone', 'https://www.bootdey.com/image/380x380/008B8B/000000', 'Gray', 500, 450, 2
    
  ];
}
