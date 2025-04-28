import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NotificationService } from './notification.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  constructor(private notificationService: NotificationService) {}

  // Obtener todos los items del carrito
  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Obtener solo los productos (para compatibilidad con código existente)
  getCartProducts(): Observable<Product[]> {
    return this.cartItemsSubject.pipe(
      map(items => items.map(item => item.product))
    );
  }

  // Calcular el total
  getTotal(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
    );
  }

  // Contar items únicos (para el badge)
  getItemsCount(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.length)
    );
  }

  // Contar cantidad total de productos (sumando cantidades)
  getTotalQuantity(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  // Añadir producto al carrito
  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Si ya existe, incrementar cantidad
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, añadir nuevo item
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
    
    // Mostrar notificación
    this.notificationService.show(
      `✅ ${product.name} añadido al carrito (${quantity})`,
      'success'
    );

    // Animación del carrito
    const cartElement = document.querySelector('.cart-icon-button');
    if (cartElement) {
      cartElement.classList.add('pulse');
      setTimeout(() => {
        cartElement.classList.remove('pulse');
      }, 500);
    }
  }

  // Eliminar producto del carrito
  removeFromCart(productId: string) {
    const updatedItems = this.cartItemsSubject.value.filter(
      item => item.product.id !== productId
    );
    this.cartItemsSubject.next(updatedItems);
    
    this.notificationService.show(
      '🗑️ Producto eliminado del carrito',
      'info'
    );
  }

  // Actualizar cantidad de un producto
  updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = newQuantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  // Vaciar el carrito
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
}