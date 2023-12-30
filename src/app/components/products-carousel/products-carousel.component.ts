import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, ProductCardComponent],
  templateUrl: './products-carousel.component.html',
  styles: ``
})
export class ProductsCarouselComponent {

  // depending on the screen-size, it will decide how many are visible.
  // pretty useless now but could prove useful for responsive design in future.
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1080px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '760px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '740px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  @Input() cat_title = "";
  // placeholder "products"
  // to-do: implement onInit and fetch the needed data then 
  products = [
    {
      name: "Item One",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Two",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Three",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "lowstock"
    },
    {
      name: "Item Four",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "nostock"
    },
    {
      name: "Item Five",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "nostock"
    },
    {
      name: "Item Six",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "nostock"
    },
    {
      name: "Item Seven",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Eight",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Nine",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Seven",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
    {
      name: "Item Seven",
      image: "https://primefaces.org/cdn/primeng/images/demo/product/black-watch.jpg",
      description: "This is some very random description written as placeholder for each product lol",
      price: 9.99,
      inventoryStatus: "Stock"
    },
  ]

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
      return "success"
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

