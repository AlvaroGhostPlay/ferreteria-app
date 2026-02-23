import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('access_token');

  console.log('[INTERCEPTOR]', req.url, 'token?', !!token);

  // ❌ No tocar endpoints de auth
  if (
    req.url.includes('/oauth2/token') ||
    req.url.includes('/api/auth/login')
  ) {
    return next(req);
  }

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        console.warn('[AUTH] Token vencido → logout');

        sessionStorage.clear();
        router.navigateByUrl('/login');
      }

      return throwError(() => error);
    })
  );
};