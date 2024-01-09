import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, ProductCardComponent, HttpClientModule],
  templateUrl: './products-carousel.component.html',
  styles: ``
})
export class ProductsCarouselComponent implements OnInit {

  constructor(private productService: ProductsService) { }
  products: any;

  ngOnInit(): void {
    // Cat_title data passed from one componenet to another takes some time apparently.
    // set-timeout is needed to make sure the request includes the right category.
    // Can it be solved in a better way? 
    setTimeout(()=> {
      this.productService.getAllProducts({
        limit: 10,
      category: this.cat_title
    }).subscribe({
      next:(data)=>{
        this.products = data;
        // console.log(this.products);
      },
      error:(e) => {console.log(e)}
    })
  },1000)
  }

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
  @Input() sign: any;

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

  skewDir(text: string) {
    if (text == "1")
      return "skewX(2deg)"
    else
      return "skewX(-2deg)"
  }
}

