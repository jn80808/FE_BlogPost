import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      
      const token = this.cookieService.get('Authorization');
      const cleanedToken = token.replace(/^Bearer\s+/i, '');

      if (cleanedToken) {
        const authRequest = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${cleanedToken}`
          }
        });

        return next.handle(authRequest);
      }

    return next.handle(request); // In case there's no token
  }
}
