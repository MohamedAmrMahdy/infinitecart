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
      { path: "", component: HomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "cart", component: CartComponent },
      { path: "profile", component: ProfileComponent },
    ],
  },
  { path: "auth", component: AuthComponent },
  { path: "**", component: ErrorComponent },
];
