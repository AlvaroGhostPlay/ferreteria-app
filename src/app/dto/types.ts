import { Mode } from "../services/sharing-data-service.service";

export type PersonKind = 'clientes' | 'empleados' | 'proveedores';

export type CrudState = {
  id: string;            // personId
  mode: Mode;            // 'create' | 'edit' | 'view'
  kind: PersonKind;      // clientes/empleados/proveedores
};