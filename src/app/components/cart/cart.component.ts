import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }
}