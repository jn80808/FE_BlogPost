import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  

  interface JwtPayload {
  sub?: string;
  exp?: number;
  // Add any other claims you expect in the token
}

  //Check for the JWT Token
  let token = cookieService.get('Authorization');

  if(token){
      token = token.replace('Bearer','');
      const decodedtoken : any = jwt_decode(token);

      //Check if token has expired 
      const expirationDate = decodedtoken.exp*1000;
      const currentTime = new Date().getTime();

      //compare if the token is not expire 
      if (expirationDate < currentTime){
      // Logout if token is not valid 
      authService.logout();
      return router.createUrlTree(['/login'],{queryParams: {returnUrl: state.url}})
      } else {
        //Token is still valid 

        
      }

  } else {
    // Logout
    authService.logout();
    return router.createUrlTree(['/login'],{queryParams: {returnUrl: state.url}})
    


  }

  return ('try')


};
