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
      description: 'Figura detallada de hatsune miku estilo funko.',
      category: 'anime',
      size: 'Mediano (15-20cm)'
    },
    {
      id: '2',
      name: 'Happy Ghast',
      price: 86.99,
      image: 'assets/images/products/02_happy_ghast-removebg-preview.png',
      description: 'Figura de Happy Ghast de Minecraft.',
      category: 'videogames',
      size: 'Grande (25-30cm)'
    },
    {
      id: '3',
      name: 'Pingu',
      price: 84.99,
      image: 'assets/images/products/03_pingu-removebg-preview.png',
      description: 'Figura de pingu.',
      category: 'custom',
      size: 'Pequeño (5-10cm)'
    },
    {
      id: '4',
      name: 'BMO',
      price: 121.99,
      image: 'assets/images/products/04_bmo-removebg-preview.png',
      description: 'Figura de BMO de hora de aventura.',
      category: 'custom',
      size: 'Mediano (15-20cm)'
    }
  ];

  private categories: string[] = ['anime', 'videogames', 'movies', 'originals', 'custom', 'tv'];
  private sizes: string[] = ['Pequeño (5-10cm)', 'Mediano (15-20cm)', 'Grande (25-30cm)'];

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): string[] {
    return this.categories;
  }

  getSizes(): string[] {
    return this.sizes;
  }

  // products.service.ts
getProductById(id: string): Product {
  const product = this.products.find(p => p.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
}

getRelatedProducts(currentProductId: string): Product[] {
  const currentProduct = this.getProductById(currentProductId);
  return this.products
    .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, 4); // Limita a 4 productos relacionados
}
}