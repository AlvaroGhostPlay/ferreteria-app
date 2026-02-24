import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const authGuard: CanActivateFn = ( state) => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);

  const authenticated = auth.isAuthenticated();

  console.log('🛡️ AuthGuard');
  console.log('URL:', state.url);
  console.log('isAuthenticated():', authenticated);
  console.log('token:', sessionStorage.getItem('access_token'));

  if (!authenticated) {
    console.log('⛔ REDIRECT A LOGIN');
    return router.createUrlTree(['/login']);
  }

  console.log('✅ ACCESO PERMITIDO');
  return true;
};