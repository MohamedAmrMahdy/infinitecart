import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { InplaceModule } from 'primeng/inplace';
import { BadgeModule } from 'primeng/badge';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../../stores/auth.store';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule  ,
      DialogModule,
      CardModule, FieldsetModule, BlockUIModule, PanelModule, InplaceModule,
     BadgeModule, DataViewModule, RatingModule, TagModule, CommonModule, PriceFormatPipe],
  templateUrl: './orders.component.html',
  providers: [OrdersService, AuthStore],
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(private http: HttpClient,private router: Router,private ordersService: OrdersService) {}
  
  readonly authStore = inject(AuthStore)
  currentUser = this.authStore.currentUser() as any


  
  orders = [];
  visible = false;
  products= [
    {id: 1, name: 'n1', category: 'c1', price: '300', quantity: 1,rating: 3, image:"https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg"},
    {id: 2, name: 'n1', category: 'c1', price: '300', quantity: 4,rating: 3, image:"https://waltonbd.com/image/catalog/home-page/half-block/nexg-n6-block.jpg"},
]
  blockedPanel = false;
  closable= false;

  ngOnInit() {
    this.ordersService.getOrders().subscribe({
      next: (response:any) => {
        this.orders =  response.filter((order:any) => {
           return order.user.id === this.currentUser.id;
          } )
          console.log(this.orders)
          
          

        // this.router.navigate(["/"]); 
        // localStorage.setItem('userData',JSON.stringify(response));
      },
      error: (err:any) => {
        console.log(err);
      }
    })

    console.log(this.orders)
   
  }

  viewDetails() {
    this.visible = true
  }


  
  // orders = [
  //   {
  //     time: "10/10/2023",
  //     status: 'pending',
  //     item: {
  //       image: "https://images.unsplash.com/photo-1558864559-ed673ba3610b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbGwlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
  //       name: 'iphone',

  //     } 
  //   }
  // ]
  // listed_products = [
  //   {
  //     id: 1,
  //     seller_id: 1,
  //     product_id: 1,
  //     stock: 30,
  //     price: 2001,
  //     discount: 0.9
  //   },
  //   {
  //     id: 2,
  //     seller_id: 2,
  //     product_id: 2,
  //     stock: 30,
  //     price: 3500,
  //     discount: 0.9
  //   },
  //   {
  //     id: 2,
  //     seller_id: 3,
  //     product_id: 3,
  //     stock: 30,
  //     price: 5000,
  //     discount: 0.9
  //   },

  // ]

}