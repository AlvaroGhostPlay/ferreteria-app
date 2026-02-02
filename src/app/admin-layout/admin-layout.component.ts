import { Component } from '@angular/core';
import { NadvarComponent } from './nadvar/nadvar.component';
import { RouterOutlet } from '@angular/router';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, NadvarComponent, FooterAdminComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {

}
