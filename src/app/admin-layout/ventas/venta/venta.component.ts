import { Component, computed, signal } from '@angular/core';

type DocType = 'Boleta' | 'Factura';
type PayType = 'Efectivo' | 'Tarjeta' | 'Transferencia';

interface CartItem {
  code: string;
  name: string;
  qty: number;
  price: number;
}

@Component({
  selector: 'app-venta',
  imports: [],
  templateUrl: './venta.component.html'
})
export class VentaComponent {

  search = signal('');
  docType = signal<DocType>('Boleta');
  payType = signal<PayType>('Efectivo');
  serie = signal('001');
  nroVenta = signal('0000025');
  efectivoRecibido = signal<number>(32.30);
  efectivoExacto = signal(true);

    cart = signal<CartItem[]>([
    { code: '7802800716777', name: 'Zuko Emoliente', qty: 1, price: 1.00 },
    { code: '7750182220378', name: 'Fanta Naranja 500ml', qty: 1, price: 1.80 },
    { code: '7501006559019', name: 'Canchita mantequilla', qty: 1, price: 3.50 },
    { code: '7751271021999', name: 'Gloria evaporada light 400g', qty: 1, price: 5.00 },
    { code: '7755139002809', name: 'Paisana extra 5k', qty: 1, price: 20.00 },
    { code: '7750670014250', name: 'Big cola 400ml', qty: 1, price: 1.00 },
  ]);

  total = computed(() =>
    this.cart().reduce((acc, it) => acc + it.qty * it.price, 0)
  );

  igv = computed(() => this.total() * 0.05);
  subtotal = computed(() => this.total() - this.igv());

  vuelto = computed(() => {
    if (this.payType() !== 'Efectivo') return 0;
    const recibido = this.efectivoExacto() ? this.total() : this.efectivoRecibido();
    return Math.max(0, +(recibido - this.total()).toFixed(2));
  });

  setEfectivoExacto(v: boolean) {
    this.efectivoExacto.set(v);
    if (v) this.efectivoRecibido.set(+this.total().toFixed(2));
  }

  incQty(i: number) {
    const items = [...this.cart()];
    items[i] = { ...items[i], qty: items[i].qty + 1 };
    this.cart.set(items);
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.total().toFixed(2));
  }

  decQty(i: number) {
    const items = [...this.cart()];
    items[i] = { ...items[i], qty: Math.max(1, items[i].qty - 1) };
    this.cart.set(items);
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.total().toFixed(2));
  }

  remove(i: number) {
    const items = [...this.cart()];
    items.splice(i, 1);
    this.cart.set(items);
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.total().toFixed(2));
  }

  vaciarListado() {
    this.cart.set([]);
  }

  realizarVenta() {
    // Luego aquí llamas a tu backend
    alert('Venta lista (demo).');
  }
}

