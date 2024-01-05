import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ErrorComponent } from "./layouts/error/error.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ProductsComponent } from "./pages/products/products.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MainComponent } from "./layouts/main/main.component";
import { authGuard } from "./guards/auth.guard";
import { ProductComponent } from "./pages/product/product.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";
import { BrandsComponent } from "./pages/brands/brands.component";
import { CategoriesComponent } from "./pages/categories/categories.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", title: 'InfinitCart - Home', component: HomeComponent },
      { path: "products", title: 'InfinitCart - Products', component: ProductsComponent },
      { path: "products/:id", title: 'InfinitCart - Products', component: ProductComponent },
      { path: "cart", title: 'InfinitCart - Cart', component: CartComponent, canActivate:[authGuard] },
      { path: "profile", title: 'InfinitCart - Profile', component: ProfileComponent, canActivate:[authGuard] },
      { path: "wishlist", title: 'InfinitCart - Wishlist',component:WishlistComponent, canActivate:[authGuard]},
      { path: "categories", title: 'InfinitCart - Categories',component:CategoriesComponent},
      { path: "Brands", title: 'InfinitCart - Brands',component:BrandsComponent}
    ]
  },
  { path: "auth", title: 'InfinitCart - Login / Register', component: AuthComponent },
  { path: "**", title: 'InfinitCart - Error', component: ErrorComponent },
];
