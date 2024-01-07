import { Component, OnInit } from '@angular/core';
import { ProductsCarouselComponent } from '../../components/products-carousel/products-carousel.component';
import { ContentCarouselComponent } from '../../components/content-carousel/content-carousel.component';
import { ButtonModule } from 'primeng/button';
import { CategoriesCarouselComponent } from '../../components/categories-carousel/categories-carousel.component';
import { categoriesService } from '../../services/categories.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsCarouselComponent, ContentCarouselComponent, CategoriesCarouselComponent, ButtonModule],
  providers: [categoriesService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  constructor(private categories: categoriesService) { }
  allCategories: any;
  randomCats: any[] = [];

  ngOnInit(): void {
    this.categories.getCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        this.randomCats = this.getRandomCategories(this.allCategories, 3)
        console.log(this.randomCats)
      },
      error: (e) => { console.log(e) }
    })
  }

  shuffleCategories(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getRandomCategories(array: any[], count: number): any[] {
    const shuffledArray = this.shuffleCategories([...array]);
    return shuffledArray.slice(0, count);
  }

}
