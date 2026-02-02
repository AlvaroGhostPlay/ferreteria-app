import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { ProductsComponent } from './admin-layout/mantenimientos/products/products.component';
import { UsersComponent } from './admin-layout/mantenimientos/users/users.component';
import { CatalogoComponent } from './admin-layout/mantenimientos/catalogo/catalogo.component';
import { MantenimientosComponent } from './admin-layout/mantenimientos/mantenimientos.component';
import { RolesComponent } from './admin-layout/mantenimientos/roles/roles.component';

const isAdminMatch = true;
export const routes: Routes = [
     {
    path: '',
    redirectTo: '/auth/inicio',
    pathMatch: 'full'
  },

  // privado para los admins
  {
    path: 'auth',
    component: AdminLayoutComponent,
    data: {
      theme: 'light'
    },
    children: [
      { path: 'inicio', component: DashboardComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'mantenimientos', component: MantenimientosComponent },
      { path: 'mantenimientos/usuarios', component: UsersComponent },
      { path: 'mantenimientos/roles', component: RolesComponent },
      { path: 'mantenimientos/catalogos', component: CatalogoComponent },
    ],
    //canMatch: [isAdmin]
  },

  // Público envuelto por el layout que pinta nav-bar y app-footer
//   {
//     path: '',
//     component: PublicLayoutComponent,
//     data: {
//       theme: 'dark'
//     },
//     children: [
//       { path: 'inicio', component: InicioComponent },
//       { path: 'contacto', component: ContactoComponent },
//       { path: 'sobre_nosotros', component: NosotrosComponent },
//       { path: 'login', component: LoginComponent },
//       { path: 'newPass', component: ChangePasswordComponent },
//       { path: 'registrarse', component: RegistrarseComponent },
//       { path: 'forget-password', component: ForgetPasswordComponent },
//     ],
//     canMatch: [isPublic]
//   },
];
