import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Dragón 3D',
      price: 15.99,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Figura detallada de dragón para colección'
    },
    {
      id: '2',
      name: 'Castillo medieval',
      price: 22.50,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}