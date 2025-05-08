import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from './api.service'; // Importa el ApiService
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [];
  private apiUrl = environment.apiUrl

  private categories: string[] = ['anime', 'videogames', 'movies', 'originals', 'custom', 'tv'];
  private sizes: string[] = ['Pequeño (5-10cm)', 'Mediano (15-20cm)', 'Grande (25-30cm)'];

  constructor(
    private apiService: ApiService
  ) {} 

  // Obtener todos los productos desde la API
  getProducts(): Observable<Product[]> {
    return this.apiService.get('products'); // Asume que tu API tiene un endpoint '/products'
  }

  // Obtener un producto por ID desde la API
  getProductById(id: string): Observable<Product> {
    return this.apiService.get(`products/${id}`); // Asume un endpoint '/products/:id'
  }
  
  // Obtener productos relacionados (ajusta según tu lógica de backend)
  getRelatedProducts(currentProductId: string): Observable<Product[]> {
    // Si tu API soporta filtrado por categoría, podrías hacer:
    return this.apiService.get(`products/related/${currentProductId}`);
  }

  getCategories(): string[] {
    return this.categories;
  }

  getSizes(): string[] {
    return this.sizes;
  }

  createProduct(product: Product): Observable<Product> {
    return this.apiService.post('products', product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.apiService.put('products', id, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.apiService.delete('products', id) as Observable<void>;
  }

  // Si necesitas manejar la subida de imágenes por separado
  // uploadImage(image: File): Observable<{url: string}> {
  //   const formData = new FormData();
  //   formData.append('image', image);
    
  //   // Para uploads de archivos necesitamos un enfoque diferente
  //   return this.apiService.http.post<{url: string}>(
  //     `${this.apiService.apiUrl}/upload`, 
  //     formData,
  //     {
  //       headers: new HttpHeaders({
  //         'Authorization': `Bearer ${this.apiService.authService.token}`
  //       })
  //     }
  //   );
  // }
}