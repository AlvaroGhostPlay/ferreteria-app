import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@example.com', telefono: '555-7777' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', telefono: '555-9000' },
]; 
}
