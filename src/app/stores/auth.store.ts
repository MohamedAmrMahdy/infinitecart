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
  withState({
    currentUser: {},
    accessToken: ""
  }),
  withMethods(({ currentUser, ...store }) => ({
    login(user, token) {
      patchState(store, {
        currentUser: {...user},
        accessToken: token
      });
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userData', JSON.stringify({
        ...user
      }));
    },
    logout() {
      patchState(store, {
        currentUser: {},
        accessToken: ""
      });
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
    },
    updateCurrentUser(updatedUser) {
      console.log('updatedUser')
      console.log(updatedUser);
      console.log('currentUser');
      console.log((currentUser()));
      patchState(store, {
       currentUser: {
        firstName: updatedUser.firstName
       }
        // currentUser: {...updatedUser}

      })
    }
  })),
  withHooks({
    onInit({ logout, login }) {
      const authService = inject(AuthService)
      if (authService.isAuthenticated()){
        let savedAccessToken = localStorage.getItem('accessToken')
        let savedCurrentUser = JSON.parse(localStorage.getItem('userData') || "{}")
        login(savedCurrentUser, savedAccessToken)
      }
    },
  }),
);
