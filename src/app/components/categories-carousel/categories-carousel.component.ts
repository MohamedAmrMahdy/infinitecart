import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [ImageModule, RouterModule],
  templateUrl: './categories-carousel.component.html',
  styleUrl: './categories-carousel.component.css'
})
export class CategoriesCarouselComponent {
  data = [
    {
      "id": 0,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/6775dedc-4f3a-464b-b392-cba51bda8b6d.png",
      "name": "smartphones",
      "desc": ""
    },
    {
      "id": 1,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/d24b9ee9-f82f-405b-9063-2448132555ad.png",
      "name": "laptops",
      "desc": ""
    },
    {
      "id": 2,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/b780817a-e37e-4c71-8347-549e570ae562.png",
      "name": "fragrances",
      "desc": ""
    },
    {
      "id": 3,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/0edb1cf7-033c-4d07-abe9-6f1967555356.png",
      "name": "skincare",
      "desc": ""
    },
    {
      "id": 4,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/caf13d1c-df88-4f12-a4fd-fea7e54e3f3b.png",
      "name": "supermarket",
      "desc": ""
    },
    {
      "id": 5,
      "image": "",
      "name": "home-decoration",
      "desc": ""
    },
    {
      "id": 6,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/729880bb-e368-4252-9b56-776ae95c88af.png",
      "name": "furniture",
      "desc": ""
    },
    {
      "id": 7,
      "image": "https://f.nooncdn.com/mpcms/EN0003/assets/4e2d9708-c585-48bd-bc2e-85ddb2091f9f.png",
      "name": "beauty",
      "desc": ""
    },
  ]
}
