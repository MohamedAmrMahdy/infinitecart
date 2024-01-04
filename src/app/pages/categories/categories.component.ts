import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { categoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ImageModule, RouterModule],
  providers: [categoriesService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesService: categoriesService) { }
  categories: any;
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        // console.log(this.products[0]);
      }
    })
  }

}
