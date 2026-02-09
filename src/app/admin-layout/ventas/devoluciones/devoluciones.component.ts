import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-devoluciones',
  imports: [RouterLink],
  templateUrl: './devoluciones.component.html'
})
export class DevolucionesComponent {
   clientes = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@example.com', telefono: '555-7777' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', telefono: '555-9000' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@example.com', telefono: '555-1111' },
  { id: 5, nombre: 'Luis Gómez', email: 'luis.gomez@example.com', telefono: '555-2222' },
  { id: 6, nombre: 'Sofía Díaz', email: 'sofia.diaz@example.com', telefono: '555-3333' },
  { id: 7, nombre: 'Miguel Torres', email: 'miguel.torres@example.com', telefono: '555-4444' },
  { id: 8, nombre: 'Elena Ramírez', email: 'elena.ramirez@example.com', telefono: '555-5555' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 10, nombre: 'Laura Hernández', email: 'laura.hernandez@example.com', telefono: '555-7777' },
]; 
}
