import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthServiceService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return router.createUrlTree(['/auth/inicio']);
  }

  return true;
};