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

  getStock(text: string) {
    if (text == "Stock")
      return "In Stock"
    else if (text == "lowstock")
      return "Low Stock"
    else
      return "Out of Stock"
  }

  getSeverity(text: string) {
    if (text == "Stock")
      return "info"
    else if (text == "lowstock")
      return "warning"
    else
      return "danger"
  }

  disableChk(text: string) {
    if (text == "Stock" || text == "lowstock")
      return false;
    else
      return true;
  }

}

