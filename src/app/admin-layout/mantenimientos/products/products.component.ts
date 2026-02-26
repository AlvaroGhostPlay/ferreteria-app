import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SharingDataServiceService } from '../../../services/sharing-data-service.service';
import { Product } from '../../../entitie/product'
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
  selector: 'app-products',
  imports: [PaginatorComponent],
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  paginator: any = {
    totalPages: 0,
    number: 0
  };
  url: string = '/auth/mantenimientos/productos/page/:page';

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private sharingDataService: SharingDataServiceService,
  ) { }

  products: Product[] = [];

  ngOnInit() {
    this.products = [];
    this.route.paramMap.subscribe(pm => {
      const page = pm.get('page') ?? '0';
      this.productService.getProducts(page).subscribe({
        next: productsDb => {
          this.products = productsDb.content;
          this.paginator = {
            totalPages: productsDb.totalPages,
            number: productsDb.number, // mejor esto
          };
          console.log(productsDb)
        },
        error: err => console.log(err)
      })
    });

  }

  deleteUser(id: string) {
    this.products = [...this.products.filter(p => p.productId !== id)];
  }

  view(id: string) {
    this.sharingDataService.emitProductCrud({ id, mode: 'view' });
    this.router.navigate(['/auth/mantenimientos/productos/view']);
  }

  update(id: string) {
    this.sharingDataService.emitProductCrud({ id, mode: 'edit' });
    this.router.navigate(['/auth/mantenimientos/productos/edit']);
  }

  create(id: string) {
    this.sharingDataService.emitProductCrud({ id, mode: 'create' });
    this.router.navigate(['/auth/mantenimientos/productos/create']);
  }
}
