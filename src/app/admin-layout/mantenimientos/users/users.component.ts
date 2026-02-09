import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageableComponent } from '../../pageable/pageable.component';

@Component({
  selector: 'users',
  imports: [RouterLink, PageableComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {

  constructor(private router: Router){}
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


deleteClient(id: number){
    this.clientes = [...this.clientes.filter(c => c.id !== id)];
}

page = 1;
totalPages = 5;

onPageChange(page: number) {
  this.page = page;
  this.router.navigate([], {
    queryParams: { page },
    queryParamsHandling: 'merge'
  });
}
}
