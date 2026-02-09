import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type Movimient = {
  idMovimiento: number,
  product: string,
  fecha: string
}

@Component({
  selector: 'historial-vista',
  imports: [],
  templateUrl: './historial-vista.component.html'
})
export class HistorialVistaComponent {
    id!: number;
    movimiento!: Movimient;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))?? null;

    this.movimiento = {
      idMovimiento: this.id,
      product: 'Lista de productos con su precio cantidad y todo lo del detalle de la factura',
      fecha: '2026-02-01'
    };

    console.log(this.id);
    console.log('entro');
  }
}
