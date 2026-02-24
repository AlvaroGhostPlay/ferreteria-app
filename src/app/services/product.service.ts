import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../entitie/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) { }

  uri: string = 'http://localhost:8090/api/product';

  getProducts(page: string): Observable<any> {
    return this.httpClient.get<any>(this.uri + '/page/' + page);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.uri + '/' + id);
  }

  saveProduct(product: Product, productId: string): Observable<Product> {
    console.log(product)
    console.log(productId)
    if (productId && productId !== '') {
      console.log('Entro al put')
      return this.httpClient.put<Product>(this.uri + '/' + productId, product);
    } else {
      console.log('Entro al post')
      return this.httpClient.post<Product>(this.uri, product);
    }
  }

  deleteProduct(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(this.uri + "/"+id);
  }
}
