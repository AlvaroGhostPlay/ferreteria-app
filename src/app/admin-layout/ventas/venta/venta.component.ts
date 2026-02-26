import { Component, computed, signal } from '@angular/core';
import { Cart } from '../../../entitie/cart';

type DocType = 'Boleta' | 'Factura';
type PayType = 'Efectivo' | 'Tarjeta' | 'Transferencia';

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
  efectivoRecibido = signal<number>(0);
  efectivoExacto = signal(true);
  hoy: Date = new Date();

    cart: Cart[] =[
    {
      product: {
        productId: '1',
        code: '7802800716777',
        productName: 'Zuko Emoliente',
        stock: 50,
        price: 1.00,
        iva: 0.05,
                        category: {
          categoryId: '',
          category: ''
        },
        brand: {
          brand: '',
          brandId: ''
        },
        image: '',
        expirationDate: this.hoy,
        descriptionProduct: ''
      },
      qty: 1,
      iva: 0,
      subtotal: 0,
      total:0
    },
    {
      product: {
        productId: '2',
        code: '7750182220378',
        productName: 'Fanta Naranja 500ml',
        stock: 30,
        price: 1.80,
        iva: 0.05,
                        category: {
          categoryId: '',
          category: ''
        },
        brand: {
          brand: '',
          brandId: ''
        },
        image: '',
        expirationDate: this.hoy,
        descriptionProduct: ''
      },
      qty: 1,
      iva: 0,
      subtotal: 0,
      total:0
    },
    {
      product: {
        productId: '3',
        code: '7501006559019',
        productName: 'Canchita mantequilla',
        stock: 25,
        price: 3.50,
        iva: 0.05,
                        category: {
          categoryId: '',
          category: ''
        },
        brand: {
          brand: '',
          brandId: ''
        },
        image: '',
        expirationDate: this.hoy,
        descriptionProduct: ''
      },
      qty: 1,
      iva: 0,
      subtotal: 0,
      total:0
    },
    {
      product: {
        productId: '4',
        code: '7751271021999',
        productName: 'Gloria evaporada light 400g',
        stock: 45,
        price: 5.00,
        iva: 0.05,
                        category: {
          categoryId: '',
          category: ''
        },
        brand: {
          brand: '',
          brandId: ''
        },
        image: '',
        expirationDate: this.hoy,
        descriptionProduct: ''
      },
      qty: 1,
      subtotal: 0,
      iva: 0,
      total:0
    }
  ];

  setEfectivoExacto(v: boolean) {
    this.efectivoExacto.set(v);
    if (v) this.efectivoRecibido.set(+this.getTotalGeneralTemp());
  }

  incQty(i: number) {
    const items = [...this.cart];
    items[i] = { ...items[i], qty: items[i].qty + 1 };
    this.cart = items;
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.getTotalGeneral());
  }

  decQty(i: number) {
    const items = [...this.cart];
    items[i] = { ...items[i], qty: Math.max(1, items[i].qty - 1) };
    this.cart = items;
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.getTotalGeneral());
  }

  remove(i: number) {
    const items = [...this.cart];
    items.splice(i, 1);
    this.cart = items;
    if (this.efectivoExacto()) this.efectivoRecibido.set(+this.getTotalGeneral());
  }

  vaciarListado() {
    this.cart = [];
  }

  realizarVenta() {
    // Luego aquí llamas a tu backend
    alert('Venta lista (demo).');
  }

  calcSubtotal(item: Cart) {
    item.subtotal = item.qty * item.product.price;
    return item.subtotal.toFixed(2);
  }

  calcIva(item: Cart) {
    item.iva = item.subtotal * item.product.iva;
    return item.iva.toFixed(2);
  }

  calcTotal(item: Cart) {
    item.total = item.subtotal + item.iva;
    return item.total.toFixed(2);
  }

  getTotalGeneral() {
    return this.cart.reduce((acc, it) => acc + it.total, 0).toFixed(2);
  }

  getIvaGeneral() {
    return this.cart.reduce((acc, it) => acc + it.iva, 0).toFixed(2);
  }

  getSubtotalGeneral() {
    return this.cart.reduce((acc, it) => acc + it.subtotal, 0).toFixed(2);
  }

  getTotalGeneralTemp() {
      return this.cart.reduce((acc, it) => acc + it.product.price * it.qty + ( it.product.price * 0.05 * it.qty), 0).toFixed(2);
    }

  getIvaGeneralTemp() {
    return this.cart.reduce((acc, it) => acc + ( it.product.price * 0.05 * it.qty), 0).toFixed(2);
  }

  getSubtotalGeneralTemp() {
    return this.cart.reduce((acc, it) => acc + it.product.price * it.qty, 0).toFixed(2);
  }

  montoRecibido(): number {
  return this.efectivoExacto() ? +this.getTotalGeneralTemp() : this.efectivoRecibido();
}

vuelto(): number {
  const total = +this.getTotalGeneralTemp();
  const recibido = this.montoRecibido();
  return Math.max(0, +(recibido - total).toFixed(2));
}

faltante(): number {
  const total = +this.getTotalGeneralTemp();
  const recibido = this.montoRecibido();
  return Math.max(0, +(total - recibido).toFixed(2));
}
  
}

