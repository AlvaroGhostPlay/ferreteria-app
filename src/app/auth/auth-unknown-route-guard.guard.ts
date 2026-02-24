import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';

export const authUnknownRouteGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? true  // deja pasar para que muestre NotFound
    : router.createUrlTree(['/login']);
};
