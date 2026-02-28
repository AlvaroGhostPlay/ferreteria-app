import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteSessionCleanerService } from './auth/route-session-cleaner.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ferreteria-app';
    constructor(cleaner: RouteSessionCleanerService) {
    cleaner.init();
  }
}
