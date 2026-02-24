import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterAdminComponent } from '../../admin-layout/footer-admin/footer-admin.component';
import { NadvarComponent } from '../../admin-layout/nadvar/nadvar.component';


@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, NadvarComponent, FooterAdminComponent],
  templateUrl: './shell-layout.component.html'
})
export class ShellLayoutComponent {

}
