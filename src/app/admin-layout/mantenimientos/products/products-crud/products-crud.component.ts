import { Component } from '@angular/core';
import { Mode, SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { Product } from '../../../../entitie/product';
import { ProductService } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ProductRequest } from '../../../../dto/product-request';
import { CatalogService } from '../../../../services/catalog.service';
import { Brand } from '../../../../entitie/brand';
import { Category } from '../../../../entitie/category';

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
  selectedBrand: string = '';
  selectedCategory: string = '';
  productRequest!: ProductRequest;
  brans: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private sharingDataService: SharingDataServiceService,
    private productService: ProductService,
    private router: Router,
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
      this.product.category ??= new Category();
  this.product.brand ??= new Brand();
    this.sharingDataService.productCrud$
      .subscribe((obj: any) => {
        this.productId = obj.id;
        this.mode = obj.mode;
        console.log(this.product.productId)

        if (!this.isEdit) return;
        this.productService.getProduct(this.productId).subscribe({
          next: product => {
            this.product = product;
            this.selectedBrand = String(this.product.brand.brandId ?? '');
            this.selectedCategory = String(this.product.category.categoryId ?? '');
            this.syncDatsdRoleFromProduct();
          },
          error: error => console.log(error)
        })
      });

    this.catalogService.getCategory().subscribe({
      next: categories => {
        this.categories = categories;
        console.log(this.categories)
      },
      error: err => console.log(err)
    })

    this.catalogService.getBrandType().subscribe({
      next: brand => {
        this.brans = brand;
        console.log(this.brans)
      },
      error: err => console.log(err)
    })

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart)
      )
      .subscribe(e => {
        const goingToUsers = e.url.startsWith('/auth/mantenimientos/productos');
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

  onBrandSelected(id: string) {
    this.selectedBrand = id;
    this.product.brand.brandId = this.selectedBrand;
    console.log('Selected role Id:', id);
  }

  onCategorySelected(id: string) {
    this.selectedCategory = id;
    this.product.category.categoryId = this.selectedCategory;
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

  save() {
    this.createUserRequest();
    console.log(this.productRequest)
    this.productService.saveProduct(this.productRequest, this.productId).subscribe({
      next: (res) => {
        this.product = res;
        if (this.mode === 'create') {
          // no cambies a edit
        }
        this.saveState();
        this.router.navigate(['/auth/mantenimientos/productos'])
      },
      error: (err) => console.log('Error al guardar cliente:', err)
    });
  }

  delete(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: ok => {
        this.router.navigate(['/auth/mantenimientos/productos'])
      },
      error: err => {
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
      image: this.product.image,
      code:this.product.code
    }
  }

  private saveState() {
    const state = {
      mode: this.mode,
      personId: this.product?.productId ?? ''
    };
  }

  private syncDatsdRoleFromProduct() {
    const branId = this.product.brand.brandId ?? '';
    const CategoryId = this.product.category.categoryId ?? '';
    this.selectedBrand = branId ? String(branId) : '';
    this.selectedCategory = CategoryId ? String(CategoryId) : '';
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
        'productId',
        'category',
        'brand',
        'code',
      ];
      return !lockedFields.includes(field);
    }

    return true; // create
  }
}

