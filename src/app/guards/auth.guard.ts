import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from "@angular/router";

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const email = localStorage.getItem("email");
  if (!!email) {
    return true;
  } else {
    return createUrlTreeFromSnapshot(next, ["/auth"]);
  }
};
