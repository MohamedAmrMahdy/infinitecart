// Angular Modules
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Prime Modules
import { PrimeNGConfig } from "primeng/api";

// Prime UI Components
import { ButtonModule } from "primeng/button";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { MenubarModule } from 'primeng/menubar';

// State Stores
import { MainStore } from "./stores/main.store";
import { ProductsStore } from "./stores/products.store";

// Angular Components
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    MenubarModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,

    NavbarComponent,
    FooterComponent
  ],
  providers: [MainStore, ProductsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infinitecart';
  readonly mainStore = inject(MainStore);
  readonly productsStore = inject(ProductsStore);

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
