import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService)

  //Check for the JWT Token
  let token = cookieService.get('Authorization');

  if(token){

  } else {
    // Logout
    authService.logout();


  }

  return ('try')


};
