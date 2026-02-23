import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterAdminComponent } from '../admin-layout/footer-admin/footer-admin.component';
import { NadvarComponent } from '../admin-layout/nadvar/nadvar.component';

@Component({
  selector: 'app-public',
  imports: [RouterOutlet, NadvarComponent, FooterAdminComponent],
  templateUrl: './public.component.html'
})
export class PublicComponent {

}
