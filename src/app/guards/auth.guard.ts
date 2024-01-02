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
  let savedCurrentUser = JSON.parse(localStorage.getItem('userData') || "{}")
  if (savedCurrentUser.sessionExpires && savedCurrentUser.sessionExpires > new Date().getTime()){
    return true;
  } else {
    return createUrlTreeFromSnapshot(next, ["/auth"]);
  }
};
