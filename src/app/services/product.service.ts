import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from './api.service'; // Importa el ApiService
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    // {
    //   id: '1',
    //   name: 'Hatsune Miku',
    //   price: 99.99,
    //   images: ['assets/images/products/01_hatsune_miku-removebg-preview.png'],
    //   description: 'Figura detallada de hatsune miku estilo funko.',
    //   category: 'anime',
    //   size: 'Mediano (15-20cm)'
    // },
    // {
    //   id: '2',
    //   name: 'Happy Ghast',
    //   price: 86.99,
    //   images: ['assets/images/products/02_happy_ghast-removebg-preview.png'],
    //   description: 'Figura de Happy Ghast de Minecraft.',
    //   category: 'videogames',
    //   size: 'Grande (25-30cm)'
    // },
    // {
    //   id: '3',
    //   name: 'Pingu',
    //   price: 84.99,
    //   images: ['assets/images/products/03_pingu-removebg-preview.png'],
    //   description: 'Figura de pingu.',
    //   category: 'custom',
    //   size: 'Pequeño (5-10cm)'
    // },
    // {
    //   id: '4',
    //   name: 'BMO',
    //   price: 121.99,
    //   images: ['assets/images/products/04_bmo-removebg-preview.png'],
    //   description: 'Figura de BMO de hora de aventura.',
    //   category: 'custom',
    //   size: 'Mediano (15-20cm)'
    // },
    // {
    //   id: '5',
    //   name: 'Minecraft Dog',
    //   price: 79.99,
    //   images: [
    //     'assets/images/products/0006_Minecraft dog_fixed/img/0001.png',
    //     'assets/images/products/0006_Minecraft dog_fixed/img/0002.png'
    //   ],
    //   description: 'Figura de perro de minecraft',
    //   category: 'videogames',
    //   size: 'Mediano (15-20cm)'
    // }
  ];

  private categories: string[] = ['anime', 'videogames', 'movies', 'originals', 'custom', 'tv'];
  private sizes: string[] = ['Pequeño (5-10cm)', 'Mediano (15-20cm)', 'Grande (25-30cm)'];

  constructor(private apiService: ApiService) {} // Inyecta ApiService

  // getProducts(): Product[] {
  //   return this.products;
  // }

    // Obtener todos los productos desde la API
    getProducts(): Observable<Product[]> {
      return this.apiService.get('products'); // Asume que tu API tiene un endpoint '/products'
    }

  getCategories(): string[] {
    return this.categories;
  }

  getSizes(): string[] {
    return this.sizes;
  }

  // products.service.ts
// getProductById(id: string): Product {
//   const product = this.products.find(p => p.id === id);
//   if (!product) {
//     throw new Error(`Product with id ${id} not found`);
//   }
//   return product;
// }
  // Obtener un producto por ID desde la API
  getProductById(id: string): Observable<Product> {
    return this.apiService.get(`products/${id}`); // Asume un endpoint '/products/:id'
  }

// getRelatedProducts(currentProductId: string): Product[] {
//   const currentProduct = this.getProductById(currentProductId);
//   return this.products
//     .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
//     .slice(0, 4); // Limita a 4 productos relacionados
// }
  // Obtener productos relacionados (ajusta según tu lógica de backend)
  getRelatedProducts(currentProductId: string): Observable<Product[]> {
    // Si tu API soporta filtrado por categoría, podrías hacer:
    return this.apiService.get(`products/related/${currentProductId}`);
    // O implementar la lógica en el frontend como antes:
    // return this.getProducts().pipe(
    //   map(products => products.filter(p => p.id !== currentProductId).slice(0, 4))
    // );
  }
}