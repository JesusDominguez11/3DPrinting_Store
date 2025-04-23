import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Dragón 3D', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Castillo 3D', price: 30, imageUrl: 'https://via.placeholder.com/150' }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}