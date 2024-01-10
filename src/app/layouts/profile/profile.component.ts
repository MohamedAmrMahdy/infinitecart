import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthStore } from '../../stores/auth.store';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuModule
  ],
  providers: [AuthStore],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  readonly authStore = inject(AuthStore)
  items?:MenuItem[];

  constructor (private router: Router){}

  signout(){
    this.authStore.logout()
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  ngOnInit(){
    this.items = [
      {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        routerLink: '/profile/'
      },
      {
        label: "Security",
        icon: "pi pi-fw pi-lock",
        command: () => {
          scrollTo(0,1000);
        }
      },
      {
        label: "Orders",
        icon: "pi pi-fw pi-bars",
        routerLink: '/profile/orders'
      },
      {
        label: "Wishlists",
        icon: "pi pi-fw pi-heart",
        routerLink: '/profile/wishlist'
      },
      {
        label: "Sign Out",
        icon: "pi pi-fw pi-sign-out",
        command: () => {
          this.signout();
        }
      },
    ];
  }
}
