// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Product[] = [];
  private cartItems$ = new BehaviorSubject<Product[]>([]); // Observable

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartItems$.next(this.cartItems); // Notifica a los suscriptores
  }

  getCartItems() {
    return this.cartItems$.asObservable(); // Retorna Observable
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItems$.next(this.cartItems); // Notifica
  }
}