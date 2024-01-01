import {
  signalStore,
  withState,
  patchState,
  withHooks,
  withMethods,
} from '@ngrx/signals';

const SESSION_TIME_IN_MINUTES = 1;

export const AuthStore = signalStore(
  withState({ currentUser: {} }),
  withMethods(({ currentUser, ...store }) => ({
    login(user) {
      //Update currentUser State
      //Check if old saved data
      let loginUser = {
        ...user
      }
      if(!user.sessionExpires) {
        loginUser.sessionExpires = new Date(new Date().getTime() + (SESSION_TIME_IN_MINUTES*60000)).getTime().toString()
        loginUser.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBhc2Rhc2QuYXNkYXNkIiwibmFtZSI6ImFzZGFzZCBhc2Rhc2QiLCJzZXNzaW9uRXhwaXJlcyI6MTcwNDEzNTU4NDY0M30.Tvf3vOs4UJ0vagUEwuvqT90CzmmlIctTZCR1406kBRQ"
      }
      patchState(store, {
        currentUser: loginUser
      });
      //Save Data To Local Storage
      localStorage.setItem('userData', JSON.stringify({
        ...loginUser
      }) );
    },
    logout() {
      patchState(store, {
        currentUser: {}
      });
      localStorage.removeItem('userData')
    },
  })),
  withHooks({
    onInit({ currentUser, logout, login }) {
      if (!currentUser){
        let savedCurrentUser = JSON.parse(localStorage.getItem('userData') || "{}")
        if (savedCurrentUser.sessionExpires && savedCurrentUser.sessionExpires < new Date().getTime()){
          logout()
        }else{
          login(savedCurrentUser)
        }
      }
    },
  }),
);
