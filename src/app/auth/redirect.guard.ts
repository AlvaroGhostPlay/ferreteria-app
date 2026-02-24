import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? router.createUrlTree(['/auth/inicio'])
    : router.createUrlTree(['/login']);
};
