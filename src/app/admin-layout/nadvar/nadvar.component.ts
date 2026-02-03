import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';

type MenuSectionId =
  | 'dashboard'
  | 'ventas'
  | 'caja'
  | 'supervision'
  | 'inventario'
  | 'productos'
  | 'mantenimientos'
  | 'reportes'
  | 'config';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;      // opcional
  section: MenuSectionId;
}

interface MenuGroup {
  title: string;
  section: MenuSectionId;
  ulrBase: string;
  items: MenuItem[];
} 

@Component({
  selector: 'nadvar',
  imports: [RouterLink],
  templateUrl: './nadvar.component.html',
})
export class NadvarComponent {
  menu: MenuGroup[] = [
    {
      title: 'Inicio',
      section: 'dashboard',
      ulrBase: '/auth/inicio',
      items: [
      ],
    },
    {
      title: 'Ventas',
      section: 'ventas',
      ulrBase: '/auth/ventas',
      items: [
        { label: 'Nueva venta', route: '/auth/ventas/venta', section: 'ventas' },
        { label: 'Historial', route: '/auth/ventas/historial', section: 'ventas' },
        { label: 'Clientes', route: '/auth/ventas/clientes', section: 'ventas' },
      ],
    },
    {
      title: 'Caja',
      section: 'caja',
      ulrBase: '/caja',
      items: [
        { label: 'Apertura/Cierre', route: '/caja/corte', section: 'caja' },
        { label: 'Movimientos', route: '/caja/movimientos', section: 'caja' },
      ],
    },
    {
      title: 'Supervisor',
      section: 'supervision',
      ulrBase: '/supervision',
      items: [
        { label: 'Aprobaciones', route: '/supervision/aprobaciones', section: 'supervision' },
        { label: 'Incidencias', route: '/supervision/incidencias', section: 'supervision' },
      ],
    },
    {
      title: 'Productos',
      section: 'productos',
      ulrBase: '/productos',
      items: [
        { label: 'Listado', route: '/productos', section: 'productos' },
        { label: 'Precios', route: '/productos/precios', section: 'productos' },
      ],
    },
    {
      title: 'Mantenimientos',
      section: 'mantenimientos',
      ulrBase: '/auth/mantenimientos',
      items: [
        { label: 'Usuarios', route: '/auth/mantenimientos/usuarios', section: 'mantenimientos' },
        { label: 'Roles', route: '/auth/mantenimientos/roles', section: 'mantenimientos' },
        { label: 'Catálogos', route: '/auth/mantenimientos/catalogos', section: 'mantenimientos' },
      ],
    },
    {
      title: 'Reportes',
      section: 'reportes',
      ulrBase: '/reportes',
      items: [
        { label: 'Ventas', route: '/reportes/ventas', section: 'reportes' },
        { label: 'Inventario', route: '/reportes/inventario', section: 'reportes' },
      ],
    },
  ];

  get visibleMenu(): MenuGroup[] {
    return this.menu;
  }
}
