import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('access_token');
  console.log('[INTERCEPTOR]', req.url, 'token?', !!token);

  // No toques requests del auth server (login/token)
  if (!token || req.url.includes('/oauth2/token') || req.url.includes('/api/auth/login')) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};