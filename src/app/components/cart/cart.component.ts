import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Product[]>; // Usamos el sufijo $ para indicar que es un Observable
  total: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit() {
    this.cartItems$.subscribe(items => {
      this.total = this.calculateTotal(items);
    });
  }

  calculateTotal(items: Product[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}