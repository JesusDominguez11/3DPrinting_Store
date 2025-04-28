import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIcon, CurrencyPipe, CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shippingCost: number = 5.99; // Costo fijo de envío por ahora
  total: number = 0;
  
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private navigation: NavigationService) { }

  exploreProducts(): void {
    this.navigation.navigateTo('/products');
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    this.total = this.subtotal + this.shippingCost;
  }

  updateQuantity(productId: string, newQuantity: number): void {
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    // Aquí implementarías la lógica de checkout
    console.log('Proceder al pago', this.cartItems);
    // this.router.navigate(['/checkout']);
  }
}