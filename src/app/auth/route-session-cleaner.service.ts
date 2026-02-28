import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

type CleanRule = {
  name: string;
  matchFrom: (url: string) => boolean;   // ¿estoy saliendo de estas rutas?
  matchTo?: (url: string) => boolean;    // (opcional) ¿a qué rutas NO limpio?
  keys: string[];                        // qué llaves borrar
};

@Injectable({ providedIn: 'root' })
export class RouteSessionCleanerService {

  // ✅ Reglas: agregás más cuando querás
  private readonly rules: CleanRule[] = [
    {
      name: 'mantenimientos-form-person',
      matchFrom: (url) => this.isPersonFormRoute(url),
      matchTo:   (url) => this.isPersonFormRoute(url), // si el destino sigue siendo form, NO limpies
      keys: ['crudPerson', 'info-crud-persons']
    },

    // 👉 ejemplo: si tenés otro módulo /auth/ventas/... y querés limpiar otras keys
    {
      name: 'ventas-form',
      matchFrom: (url) => url.startsWith('/auth/ventas/'),
      matchTo:   (url) => url.startsWith('/auth/ventas/'),
      keys: ['ventaDraft', 'ventaClienteTmp', 'ventaCarrito']
    },

    // 👉 ejemplo: salir de reportes limpia filtros
    {
      name: 'reportes',
      matchFrom: (url) => url.startsWith('/auth/reportes/'),
      matchTo:   (url) => url.startsWith('/auth/reportes/'),
      keys: ['reportFilters', 'reportDateRange']
    },
  ];

  constructor(private router: Router) {}

  init(): void {
    this.router.events
      .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(e => {
        const from = this.router.url;
        const to = e.url;

        for (const rule of this.rules) {
          const leavingThisGroup = rule.matchFrom(from) && !(rule.matchTo?.(to) ?? false);

          if (leavingThisGroup) {
            // opcional: log
            // console.log(`[Cleaner] rule=${rule.name} from=${from} to=${to} keys=${rule.keys}`);

            rule.keys.forEach(k => sessionStorage.removeItem(k));
          }
        }
      });
  }

  // ========= MATCHERS reutilizables =========

  private isPersonFormRoute(url: string): boolean {
    // /auth/mantenimientos/:kind/:mode
    // /auth/mantenimientos/:kind/address/:mode
    return /^\/auth\/mantenimientos\/(clientes|empleados|proveedores)\/(create|edit|view)(\/|$)/.test(url)
        || /^\/auth\/mantenimientos\/(clientes|empleados|proveedores)\/address\/(create|edit|view)(\/|$)/.test(url);
  }
}