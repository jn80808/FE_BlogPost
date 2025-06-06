import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

// Define the expected structure of the token
interface JwtPayload {
  exp: number;
  sub?: string;
  roles?: string[];
}

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  // Get token from cookie
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer', '').trim(); // Clean token format
    const decodedToken = jwtDecode<JwtPayload>(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      // Token expired
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
      // Token is valid

      // Allow access if user has 'writer' role (case-insensitive)
      if (user.roles.some(role => role.toLowerCase() === 'writer')) {
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }

  } else {
    // Token or user missing
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
