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
import { InfoClientsCrudComponent } from './admin-layout/ventas/clientes/info-clients-crud/info-clients-crud.component';
import { HistorialVistaComponent } from './admin-layout/ventas/historial/historial-vista/historial-vista.component';
import { DevolucionesComponent } from './admin-layout/ventas/devoluciones/devoluciones.component';
import { NewDevolucionComponent } from './admin-layout/ventas/devoluciones/new-devolucion/new-devolucion.component';
import { UsuariosCrudComponent } from './admin-layout/mantenimientos/users/usuarios-crud/usuarios-crud.component';
import { RolesCrudComponent } from './admin-layout/mantenimientos/roles/roles-crud/roles-crud.component';
import { LoginComponent } from './public/login/login.component';
import { AuthCallbackComponent } from './admin-layout/auth-callback/auth-callback.component';
import { authGuard } from './auth/auth.guard';
import { loginGuard } from './auth/auth-login.guard';
import { NotFoundComponent } from './admin-layout/not-found/not-found.component';
import { ForbiddenComponent } from './admin-layout/forbidden/forbidden.component';
import { roleGuard } from './auth/role.guard';
import { PublicComponent } from './public/public.component';
import { ShellLayoutComponent } from './public/shell-layout/shell-layout.component';
import { authUnknownRouteGuardGuard } from './auth/auth-unknown-route-guard.guard';
import { redirectGuard } from './auth/redirect.guard';
import { ProductCrudComponent } from './admin-layout/mantenimientos/products/products-crud/products-crud.component';
import { EmployeeCrudComponent } from './admin-layout/mantenimientos/employees/employee-crud/employee-crud.component';
import { EmployeesComponent } from './admin-layout/mantenimientos/employees/employees.component';
import { InfoPersonComponent } from './admin-layout/mantenimientos/employees/info-person/info-person.component';

export const routes: Routes = [

{
  path: '',
  component: PublicComponent,
  children: [
    { path: '', canActivate: [redirectGuard], component: PublicComponent }, // 👈 opción A (si querés, abajo te doy opción B mejor)
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] }
  ]
},

  { path: 'auth/callback', component: AuthCallbackComponent },

  // 404 explícito
  {
    path: '404',
    component: ShellLayoutComponent,
    children: [{ path: '', component: NotFoundComponent }]
  },

  {
    path: 'auth',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { theme: 'light' },
    children: [
      { path: 'inicio', component: DashboardComponent },

      { path: 'productos', component: ProductsComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },

      { path: 'mantenimientos', component: MantenimientosComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/usuarios', component: UsersComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/usuarios/page/:page', component: UsersComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/usuarios/create', component: UsuariosCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/usuarios/edit', component: UsuariosCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/usuarios/info', component: UsuariosCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },

      { path: 'mantenimientos/roles', component: RolesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/roles/page/:page', component: RolesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/roles/create', component: RolesCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/roles/edit/:id', component: RolesCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/catalogos', component: CatalogoComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },

      { path: 'mantenimientos/productos', component: ProductsComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/productos/page/:page', component: ProductsComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/productos/edit', component: ProductCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/productos/create', component: ProductCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/productos/view', component: ProductCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },

      /*{ path: 'mantenimientos/empleados', component: EmployeesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/empleados/page/:page', component: EmployeesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/empleados/edit', component: EmployeeCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/empleados/create', component: EmployeeCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'mantenimientos/empleados/view', component: EmployeeCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_ROLE_EMPLEADO'] } },*/

      { path: 'mantenimientos/:kind', component: EmployeesComponent, canActivate: [roleGuard] },
      { path: 'mantenimientos/:kind/page/:page', component: EmployeesComponent, canActivate: [roleGuard] },
      { path: 'mantenimientos/:kind/:mode', component: EmployeeCrudComponent, canActivate: [roleGuard] },
      { path: 'mantenimientos/:kind/address/:mode', component: InfoPersonComponent, canActivate: [roleGuard] },

      { path: 'ventas', component: VentasComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/venta', component: VentaComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/pedido', component: PedidoComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/historial', component: HistorialComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/historial/:id', component: HistorialVistaComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },

      { path: 'ventas/clientes', component: ClientesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/page/:page', component: ClientesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/edit', component: ClienteCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/create', component: ClienteCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/info', component: ClienteCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/address/create', component: InfoClientsCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/clientes/address/edit', component: InfoClientsCrudComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },

      { path: 'ventas/devoluciones', component: DevolucionesComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/devoluciones/new', component: NewDevolucionComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },
      { path: 'ventas/devoluciones/view/:id', component: NewDevolucionComponent, canActivate: [roleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_ROLE_EMPLEADO'] } },

      // ✅ wildcard de /auth al final (opcional)
      //  { path: '**', redirectTo: 'inicio' }
    ],
  },

  {
    path: '403',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: ForbiddenComponent }]
  },

  // ✅ wildcard global: decide login vs 404
  {
    path: 'route-not-found',
    canActivate: [authUnknownRouteGuardGuard],
    component: ShellLayoutComponent, // puede ser cualquier componente layout
    children: [{ path: '', component: NotFoundComponent }] // no se va a ver si redirige a /login
  },
  { path: '**', redirectTo: 'route-not-found' }
];

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

