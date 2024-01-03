import {
  signalStore,
  withState,
  patchState,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthStore = signalStore(
  withState({ currentUser: {}, token: "" }),
  withMethods(({ currentUser, ...store }) => ({
    login(user, token) {
      let loginUser = {
        ...user
      }

      patchState(store, {
        currentUser: loginUser
      });

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userData', JSON.stringify({
        ...loginUser
      }));
    },
    logout() {
      patchState(store, {
        currentUser: {},
        token: ""
      });
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
    },
  })),
  withHooks({
    onInit({ currentUser, token, logout, login }) {
      const authService = inject(AuthService)
      if (!currentUser || !token){
        let accessToken = localStorage.getItem('accessToken')
        let savedCurrentUser = JSON.parse(localStorage.getItem('userData') || "{}")
        if (!authService.isAuthenticated()){
          logout()
        }else{
          login(savedCurrentUser, accessToken)
        }
      }
    },
  }),
);
