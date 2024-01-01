import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, FormsModule,
    CardModule,
  ButtonModule,
  RatingModule,
  CommonModule,
  CheckboxModule,
  AccordionModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  priceRange1:number=0; //price ranges to select ranges from user to filter
  priceRange2:number=0;
  value:number = 4; //value For Rating Component
  seller:string[] = ['']; //for select sellers and brands to filter
  brand:string[] = [''];
  products=[
    {id: 1,
    image: "https://images.unsplash.com/photo-1558864559-ed673ba3610b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbGwlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    name: "Laptop DELL",
    desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, Intel UHD",
    details: [
      {"title": "CPU", "info": "Core i7"}
    ],
    stock: 30,
    category_id: 1,
    brand_id: 1},
    {id: 2,
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Camera",
      desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, hjklkjk ssd ",
      details: [
        {"title": "CPU", "info": "Core i7"}
      ],
      stock: 30,
      category_id: 1,
      brand_id: 1},
      {id: 3,
        image: "https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg",
        name: "Mobile",
        desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, hjklkjk ssd ",
        details: [
          {"title": "CPU", "info": "Core i7"}
        ],
        stock: 30,
        category_id: 1,
        brand_id: 1},
        {id: 3,
          image: "https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg",
          name: "Mobile",
          desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, hjklkjk ssd ",
          details: [
            {"title": "CPU", "info": "Core i7"}
          ],
          stock: 30,
          category_id: 1,
          brand_id: 1},
          {id: 1,
            image: "https://images.unsplash.com/photo-1558864559-ed673ba3610b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbGwlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
            name: "Laptop DELL",
            desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, Intel UHD",
            details: [
              {"title": "CPU", "info": "Core i7"}
            ],
            stock: 30,
            category_id: 1,
            brand_id: 1},
            {id: 2,
              image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              name: "Camera",
              desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, hjklkjk ssd ",
              details: [
                {"title": "CPU", "info": "Core i7"}
              ],
              stock: 30,
              category_id: 1,
              brand_id: 1},
              {id: 3,
                image: "https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg",
                name: "Mobile",
                desc: "Dell Vostro 3510 laptop - 11th Intel core i3-1115G4, 8 GB RAM, 1 TB HDD + 256 GB SSD, hjklkjk ssd ",
                details: [
                  {"title": "CPU", "info": "Core i7"}
                ],
                stock: 30,
                category_id: 1,
                brand_id: 1}
  ];
  listed_products = [
    {
      id: 1,
      seller_id: 1,
      product_id: 1,
      stock: 30,
      price: 2001,
      discount: 0.9
    },
    {
      id: 2,
      seller_id: 2,
      product_id: 2,
      stock: 30,
      price: 3500,
      discount: 0.9
    },
    {
      id: 2,
      seller_id: 3,
      product_id: 3,
      stock: 30,
      price: 5000,
      discount: 0.9
    },

  ]
  sellers= [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9F7aRc0I5KJxVfeKHxNg0T0PGtfzc59ixpA&usqp=CAU",
      name: "Ali",
      reputation: 4.8,
      speed: 9.7
    },
    {
      id: 2,
      image: "https://img.utdstc.com/icon/379/433/379433746b2600294b0e3d84739670dab3bf64af006cb1f7893d3fe5ed617244:200",
      name: "Tech Hub",
      reputation: 4.8,
      speed: 9.7
    },
    {
      id: 3,
      image: "https://img.utdstc.com/icon/379/433/379433746b2600294b0e3d84739670dab3bf64af006cb1f7893d3fe5ed617244:200",
      name: "Tech Hub",
      reputation: 4.8,
      speed: 9.7
    }
  ]
}
