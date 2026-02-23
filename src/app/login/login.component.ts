import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthServiceService) { }

    onSubmit() {
    this.error = '';

    // 1) manda user/pass al backend para crear cookie
    this.authService.loginWithPassword(this.username, this.password).subscribe({
      next: async () => {
        // 2) ya autenticado -> pedir code PKCE
        await this.authService.startOAuth2();
      },
      error: (e) => {
        console.error(e);
        this.error = 'Credenciales inválidas o error en el servidor';
      },
    });
  }
}
