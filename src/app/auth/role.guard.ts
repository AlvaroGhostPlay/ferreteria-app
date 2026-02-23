import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as string[];
  const userRoles = JSON.parse(sessionStorage.getItem('roles') || '[]');
  console.log(userRoles)

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const hasAccess = requiredRoles.some(role =>
    userRoles.includes(role)
  );

  if (!hasAccess) {
    return router.createUrlTree(['/403']);
  }

  return true;
};
