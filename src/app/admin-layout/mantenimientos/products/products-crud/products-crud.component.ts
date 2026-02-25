import { Component } from '@angular/core';
import { Mode, SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { Person } from '../../../../entitie/person';
import { Product } from '../../../../entitie/product';
import { ProductService } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ProductRequest } from '../../../../dto/product-request';

@Component({
  selector: 'app-products-crud',
  imports: [FormsModule],
  templateUrl: './products-crud.component.html'
})

export class ProductCrudComponent {

  hoy: Date = new Date();
  productId: string = '';
  mode: Mode = 'create';
  private destroy$ = new Subject<void>();

  types: boolean[] = [true, false]

  product: Product = new Product();
  selectedRoleId: string = '';
  searchTerm = '';
  clients: Person[] = [];
  productRequest!: ProductRequest; 

  constructor(
    private sharingDataService: SharingDataServiceService,
    private productService: ProductService,
    private router: Router,
    private clientService: PersonService
  ) { }

  ngOnInit() {
    this.sharingDataService.userCrud$
      .subscribe((obj: any) => {
        this.productId = obj.id;
        this.mode = obj.mode;
        console.log(this.product.productId)


        this.productService.getProduct(this.productId).subscribe({
          next: product => {
            this.product = product;
            this.syncSelectedRoleFromUser();
          },
          error: error => console.log(error)
        })
      });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        const goingToUsers = e.url.startsWith('/auth/mantenimientos/usuarios');
        if (!goingToUsers) {
          this.sharingDataService.clearUserId();
        }
      });
  }

  cancel() {
    this.sharingDataService.clearUserId();
    this.router.navigate(['/auth/mantenimientos']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRoleSelected(id: string) {
    this.selectedRoleId = id;
    //this.user.roles[0].roleId = id // lo dejas listo para el request
    console.log('Selected role Id:', id);
  }

  get isEdit(): boolean {
    return (this.productId ?? '').trim().length > 0;
  }

  hasValue(v: unknown): boolean {
    return v !== null && v !== undefined && String(v).trim().length > 0;
  }

  onEnabledChange(value: boolean) {
    //this.product.enabled = value;
    console.log('Enabled value:', value);
  }

  onPassChange(value: boolean) {
   // this.user.mostChangePass = value;
    console.log('Enabled value:', value);
  }

  save() {
    this.createUserRequest();
    this.productService.saveProduct(this.productRequest, this.productId).subscribe({
      next: (res) => {
        this.product = res;
        if (this.mode === 'create') {
          // no cambies a edit
        }
        this.saveState();
        this.productService.saveProduct(this.productRequest, this.productId ).subscribe({
          next: ok =>{
            this.router.navigate(['/auth/mantenimientos/productos'])
          }
        });
      },
      error: (err) => console.log('Error al guardar cliente:', err)
    });
  }

  delete(id:string){
    this.productService.deleteProduct(id).subscribe({
      next: ok => {
        this.router.navigate(['/auth/mantenimientos/productos'])
      },
      error : err => {
        console.log(err)
      }
    })
  }

  createUserRequest() {
    this.productRequest = {
      productId: null,
      productName: this.product.productName,
      descriptionProduct: this.product.descriptionProduct,
      idCategory: this.product.category.categoryId, 
      price: this.product.price,
      iva: this.product.iva,
      stock: this.product.stock,
      idBrand: this.product.brand.brandId,
      expirationDate: this.product.expirationDate,
      image: this.product.image
    }
  }

  private saveState() {
    const state = {
      mode: this.mode,
      personId: this.product?.productId ?? ''
    };
  }

  private syncSelectedRoleFromUser() {
    //const roleId = this.product?.roles?.[0]?.roleId ?? '';
    //this.selectedRoleId = roleId ? String(roleId) : '';
  }


  get isView(): boolean {
    return this.mode === 'view';
  }

  get isEdite(): boolean {
    return this.mode === 'edit';
  }

  get isCreate(): boolean {
    return this.mode === 'create';
  }

  canEdit(field: string): boolean {
    console.log(this.mode)
    if (this.isView) return false;

    if (this.isEdite) {
      const lockedFields = [
        'userId',
        'createdAt',
        'username',
        'roles',
        'updateDate',
        'enabled',
        'mostChangePass'
      ];
      return !lockedFields.includes(field);
    }

    return true; // create
  }

  onSearchClient() {
    if (this.searchTerm.length < 2) {
      this.clients = [];
      return;
    }

    this.clientService.searchClients(this.searchTerm)
      .subscribe(res => {
        this.clients = res;
        console.log(this.clients)
      });
  }
}

