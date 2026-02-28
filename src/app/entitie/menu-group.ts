type MenuSectionId =
  | 'dashboard'
  | 'ventas'
  | 'inventario'
  | 'productos'
  | 'reportes'
  | 'caja'
  | 'mantenimientos'
  | 'supervision'
  | 'config';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;      // opcional
  section: MenuSectionId;
}

export interface MenuGroup {
  title: string;
  section: MenuSectionId;
  urlBase: string;
  items: MenuItem[];
} 