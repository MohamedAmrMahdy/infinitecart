import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-content-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './content-carousel.component.html',
  styles: ``
})
export class ContentCarouselComponent {
  // Expected Data inside the Content Carousel
  // Images link followed by expected destination URL
  // can be re-used for several parts of the same page.
  // =======================
  // Problem: how do we store this in the json-server?
  // @Input data: any;
  data = [
    {image: "https://i.ibb.co/NF0m3VG/image.png", dest:"https://google.com"},
    {image: "https://i.ibb.co/wL5ZKdq/image.png", dest:"https://facebook.com"},
    {image: "https://i.ibb.co/KWWxRfh/image.png", dest:"https://fast.com"},
  ]
}
