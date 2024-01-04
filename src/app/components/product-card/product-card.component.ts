import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CardModule, ButtonModule, TagModule, CarouselModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})

export class ProductCardComponent {
  @Input() product: any;
  // images = ['https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg', 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg', 'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg'];

  getStock(num: number) {
    if (num <= 0)
      return "Out of Stock"
    else if (num < 300)
      return "Low Stock"
    else
      return "In Stock"
  }

  getSeverity(num: number) {
    if(num <= 0)
      return "danger"
    else if(num < 300)
      return "warning"
    else
      return "info"
  }

  disableChk(num: number) {
    if(num <= 0)
      return true;
    else
      return false;
  }

}

