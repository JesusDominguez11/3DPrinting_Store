import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Añade esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cartItemCount = 0;

  constructor(private cartService: CartService) {
    this.cartItemCount = this.cartService.getCartItems().length;
  }
}