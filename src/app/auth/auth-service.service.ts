import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { decodeJwt } from './auth-jwt-util.guard';
import { isTokenExpired } from './auth-jwt-util.guard';

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authServer = 'http://localhost:9100';
  private clientId = 'ferr-jose-spa';
  private redirectUri = 'http://localhost:4200/auth/callback';
  private scope = 'openid profile';
  private username = '';

  constructor(private http: HttpClient) { }

    loginWithPassword(username: string, password: string): Observable<void> {
      this.username = username;
      sessionStorage.setItem('username', this.username);
    return this.http.post<void>(
      `${this.authServer}/api/auth/login`,
      { username, password },
      { withCredentials: true } // IMPORTANTÍSIMO para guardar la cookie
    );
  }

    // 2) Ya autenticado con cookie -> pedir authorization code con PKCE
  async startOAuth2(): Promise<void> {
    const state = crypto.randomUUID();
    const verifier = this.randomString(64);
    const challenge = await this.pkceChallenge(verifier);

    sessionStorage.setItem('pkce_state', state);
    sessionStorage.setItem('pkce_verifier', verifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `${this.authServer}/oauth2/authorize?${params.toString()}`;
  }

    // 3) Callback: code -> tokens
  handleCallback(code: string, state: string): Observable<TokenResponse> {
    const savedState = sessionStorage.getItem('pkce_state');
    const verifier = sessionStorage.getItem('pkce_verifier');

    if (!savedState || savedState !== state || !verifier) {
      throw new Error('Invalid state / missing verifier');
    }

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('code', code)
      .set('code_verifier', verifier);

    return this.http
      .post<TokenResponse>(`${this.authServer}/oauth2/token`, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true, // para enviar la cookie de sesión
      })
      .pipe(tap(t => {this.storeTokens(t)
        console.log('Tokens almacenados:', t);
      }));
  }

  refresh() {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh_token');

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('client_id', this.clientId)
      .set('refresh_token', refreshToken);

    return this.http.post<TokenResponse>(`${this.authServer}/oauth2/token`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  logoutApi(): Observable<void> {
    sessionStorage.setItem('refresh_token', '')
    sessionStorage.setItem('access_token', '')
    sessionStorage.setItem('username','');
    return this.http.post<void>(
      `${this.authServer}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
  }

  get accessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  private storeTokens(t: TokenResponse) {
    sessionStorage.setItem('access_token', t.access_token);
    if (t.refresh_token) sessionStorage.setItem('refresh_token', t.refresh_token);
    
    const payload = decodeJwt(t.access_token);

    //Guardo los reoles que viene del access token para usarlo en los guards
    if (payload?.roles) {
      sessionStorage.setItem('roles', JSON.stringify(payload.roles));
    }
  }

  private randomString(length: number) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const values = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) result += charset[values[i] % charset.length];
    return result;
  }

  private async pkceChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

isAuthenticated(): boolean {
  const token = this.accessToken;

  if (!token) return false;

  return !isTokenExpired(token);
}
}