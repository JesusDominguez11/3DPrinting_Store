import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Product[] = [];

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}