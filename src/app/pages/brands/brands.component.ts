import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ImageModule, RouterModule],
  providers: [BrandsService],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands:any;
  constructor(private brandsService: BrandsService) { }
  ngOnInit(): void {
    this.brandsService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
        // console.log(this.products[0]);
      }
    })
  }
}
