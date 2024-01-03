import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService)
  if (authService.isAuthenticated()){
    return true;
  } else {
    return createUrlTreeFromSnapshot(next, ["/auth"]);
  }
};
