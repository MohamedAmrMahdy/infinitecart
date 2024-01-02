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

// Angular Components
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-main',
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
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
