import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  
  constructor(private notificationService: NotificationService) {}

  // Métodos existentes (se mantienen igual)
  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  getTotal(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.reduce((sum, item) => sum + item.price, 0))
    );
  }

  // Notificación al añadir producto (ya implementado)
  addToCart(product: Product) {
    const current = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...current, product]);
    
    const cartElement = document.querySelector('.cart-floating');
    
    if (cartElement) {
      cartElement.classList.add('pulse');
      setTimeout(() => {
        cartElement.classList.remove('pulse');
      }, 500);
    }

    this.notificationService.show(
      `✅ ${product.name} añadido al carrito`,
      'success'
    );
  }

  // Notificación al vaciar el carrito (nuevo)
  clearCart() {
    if (this.cartItemsSubject.value.length > 0) {
      this.cartItemsSubject.next([]);
      this.notificationService.show(
        '🛒 Carrito vaciado correctamente',
        'info',
        2000
      );
    }
  }

  // Nuevo método para errores (ejemplo: validación de stock)
  tryAddProduct(product: Product, availableStock: number): boolean {
    if (availableStock <= 0) {
      this.notificationService.show(
        '❌ No hay suficiente stock disponible',
        'error',
        4000
      );
      return false;
    }

    if (availableStock < 3) { // Ejemplo: quedan pocas unidades
      this.notificationService.show(
        `⚠️ ¡Quedan solo ${availableStock} unidades!`,
        'warning',
        3000
      );
    }

    this.addToCart(product);
    return true;
  }
}