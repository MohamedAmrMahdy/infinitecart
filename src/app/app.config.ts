import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import { routes } from './app.routes';

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), importProvidersFrom(
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
),]
};
