import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ErrorComponent } from "./layouts/error/error.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ProductsComponent } from "./pages/products/products.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MainComponent } from "./layouts/main/main.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", title: 'InfinitCart - Home', component: HomeComponent },
      { path: "products", title: 'InfinitCart - Products', component: ProductsComponent },
      { path: "cart", title: 'InfinitCart - Cart', component: CartComponent },
      { path: "profile", title: 'InfinitCart - Profile', component: ProfileComponent },
    ],
  },
  { path: "auth", title: 'InfinitCart - Login / Register', component: AuthComponent },
  { path: "**", title: 'InfinitCart - Error', component: ErrorComponent },
];
