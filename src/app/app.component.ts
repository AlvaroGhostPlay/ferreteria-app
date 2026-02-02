import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NadvarComponent } from "./admin-layout/nadvar/nadvar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NadvarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ferreteria-app';
}
