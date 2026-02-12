import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { ProductsComponent } from './admin-layout/mantenimientos/products/products.component';
import { UsersComponent } from './admin-layout/mantenimientos/users/users.component';
import { CatalogoComponent } from './admin-layout/mantenimientos/catalogo/catalogo.component';
import { MantenimientosComponent } from './admin-layout/mantenimientos/mantenimientos.component';
import { RolesComponent } from './admin-layout/mantenimientos/roles/roles.component';
import { VentasComponent } from './admin-layout/ventas/ventas.component';
import { VentaComponent } from './admin-layout/ventas/venta/venta.component';
import { PedidoComponent } from './admin-layout/ventas/pedido/pedido.component';
import { HistorialComponent } from './admin-layout/ventas/historial/historial.component';
import { ClientesComponent } from './admin-layout/ventas/clientes/clientes.component';
import { ClienteCrudComponent } from './admin-layout/ventas/clientes/cliente-crud/cliente-crud.component';
import { HistorialVistaComponent } from './admin-layout/ventas/historial/historial-vista/historial-vista.component';
import { DevolucionesComponent } from './admin-layout/ventas/devoluciones/devoluciones.component';
import { NewDevolucionComponent } from './admin-layout/ventas/devoluciones/new-devolucion/new-devolucion.component';
import { UsuariosCrudComponent } from './admin-layout/mantenimientos/users/usuarios-crud/usuarios-crud.component';
import { RolesCrudComponent } from './admin-layout/mantenimientos/roles/roles-crud/roles-crud.component';

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
      { path: 'mantenimientos/usuarios/page/:page', component: UsersComponent },
      { path: 'mantenimiento/usuairos/create', component: UsuariosCrudComponent },
      { path: 'mantenimiento/usuairos/edit/:id', component: UsuariosCrudComponent },

      { path: 'mantenimientos/roles', component: RolesComponent },
      { path: 'mantenimientos/roles/page/:page', component: RolesComponent },
      { path: 'mantenimientos/roles/create', component: RolesCrudComponent },
      { path: 'mantenimientos/roles/edit/:id', component: RolesCrudComponent },
      { path: 'mantenimientos/catalogos', component: CatalogoComponent },

      { path: 'ventas', component: VentasComponent },
      { path: 'ventas/venta', component: VentaComponent },
      
      { path: 'ventas/pedido', component: PedidoComponent },

      { path: 'ventas/historial', component: HistorialComponent },
      { path: 'ventas/historial/:id', component: HistorialVistaComponent },

      { path: 'ventas/clientes', component: ClientesComponent },
      { path: 'ventas/clientes/page/:page', component: ClientesComponent },
      { path: 'ventas/clientes/edit/:id', component: ClienteCrudComponent },
      { path: 'ventas/clientes/create', component: ClienteCrudComponent },

      { path: 'ventas/devoluciones', component: DevolucionesComponent },
      { path: 'ventas/devoluciones/new', component: NewDevolucionComponent },
      { path: 'ventas/devoluciones/view/:id', component: NewDevolucionComponent },
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
