import { Component } from '@angular/core';
import { ProductsCarouselComponent } from '../../components/products-carousel/products-carousel.component';
import { ContentCarouselComponent } from '../../components/content-carousel/content-carousel.component';
import { ButtonModule } from 'primeng/button';
import { CategoriesCarouselComponent } from '../../components/categories-carousel/categories-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsCarouselComponent, ContentCarouselComponent, CategoriesCarouselComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
