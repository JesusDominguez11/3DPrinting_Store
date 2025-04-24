import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Hatsune Miku',
      price: 99.99,
      image: 'assets/images/products/01_hatsune_miku-removebg-preview.png',
      description: 'Figura detallada de hatsune miku estilo funko.'
    },
    {
      id: '2',
      name: 'Happy Ghast',
      price: 86.99,
      image: 'assets/images/products/02_happy_ghast-removebg-preview.png',
      description: 'Figura de Happy Ghast de Minecraft.'
    },
    {
      id: '3',
      name: 'Pingu',
      price: 84.99,
      image: 'assets/images/products/03_pingu-removebg-preview.png',
      description: 'Figura de pingu.'
    },
    {
      id: '4',
      name: 'BMO',
      price: 121.99,
      image: 'assets/images/products/04_bmo-removebg-preview.png',
      description: 'Figura de BMO de hora de aventura.'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}