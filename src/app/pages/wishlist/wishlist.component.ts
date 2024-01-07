import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    CardsComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlist:any
  ngOnInit(): void {
    this.getWishlist()
  }
  getWishlist(){
    this.wishlist=JSON.parse(localStorage.getItem('wishlist') || "[]");
    return this.wishlist;
  }

}
