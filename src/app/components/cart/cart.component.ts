import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Suscríbete al Observable
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items; // Asigna el array emitido
      this.total = this.cartService.getTotal();
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }
}