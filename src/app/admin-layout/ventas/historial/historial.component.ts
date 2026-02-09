import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

type Movimiento = {
  idMovimiento: number,
  productName: string,
  total: number,
  personName: string 
  fecha: string
}

@Component({
  selector: 'historial',
  imports: [RouterLink],
  templateUrl: './historial.component.html'
})
export class HistorialComponent {
  movimientos: Movimiento[] = [
    {
      idMovimiento: 123456789,
      productName: 'Comida',
      total: 2000,
      personName: 'Eduardo Vásquez',
      fecha: '2026-02-09'
    },
    {
      idMovimiento: 123456700,
      productName: 'Comida',
      total: 2000,
      personName: 'Eduardo Vásquez',
      fecha: '2026-02-09'
    },
    {
      idMovimiento: 123456711,
      productName: 'Comida',
      total: 2000,
      personName: 'Eduardo Vásquez',
      fecha: '2026-02-09'
    },
    {
      idMovimiento: 123456722,
      productName: 'Comida',
      total: 2000,
      personName: 'Eduardo Vásquez',
      fecha: '2026-02-09'
    },
  ]
}
