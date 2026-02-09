import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageableComponent } from '../../pageable/pageable.component';

type Cliente = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
};

const MOCK_CLIENTES: Cliente[] = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@example.com', telefono: '555-7777' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', telefono: '555-9000' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@example.com', telefono: '555-1111' },
  { id: 5, nombre: 'Luis Gómez', email: 'luis.gomez@example.com', telefono: '555-2222' },
  { id: 6, nombre: 'Sofía Díaz', email: 'sofia.diaz@example.com', telefono: '555-3333' },
  { id: 7, nombre: 'Miguel Torres', email: 'miguel.torres@example.com', telefono: '555-4444' },
  { id: 8, nombre: 'Elena Ramírez', email: 'elena.ramirez@example.com', telefono: '555-5555' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 9, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', telefono: '555-6666' },
  { id: 10, nombre: 'Laura Hernández', email: 'laura.hernandez@example.com', telefono: '555-7777' },
];

@Component({
  selector: 'roles',
  imports: [PageableComponent, RouterLink],
  templateUrl: './roles.component.html'
})

export class RolesComponent {
constructor(private router: Router){}

page = 1;
pageSize = 5; // 👈 cuantos registros por página
totalPages = 1;

ngOnInit() {
  this.loadClientes(this.page);
}


  clientes: Cliente[] = [];

  loadClientes(page: number) {
  const start = (page - 1) * this.pageSize;
  const end = start + this.pageSize;

  // simulación backend
  this.clientes = MOCK_CLIENTES.slice(start, end);

  this.totalPages = Math.ceil(MOCK_CLIENTES.length / this.pageSize);
}


deleteClient(id: number){
    this.clientes = [...this.clientes.filter(c => c.id !== id)];
}

onPageChange(page: number) {
  this.page = page;

  // simula request al backend
  this.loadClientes(page);
}
}

