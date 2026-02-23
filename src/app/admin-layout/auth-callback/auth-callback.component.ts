import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    if (!code || !state) {
      this.router.navigate(['/login']);
      return;
    }

    this.auth.handleCallback(code, state).subscribe({
      next: () => this.router.navigate(['/auth/inicio']),
      error: (e) => {
        console.error(e);
        this.router.navigate(['/login']);
      },
    });
  }
}
