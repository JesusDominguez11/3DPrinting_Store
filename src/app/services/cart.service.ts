import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NotificationService } from './notification.service'; 

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  
  constructor(private notificationService: NotificationService) {}

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  getTotal(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.reduce((sum, item) => sum + item.price, 0))
    );
  }

  addToCart(product: Product) {
    const current = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...current, product]);

    this.notificationService.show(`✅ ${product.name} añadido al carrito`);

  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  
}