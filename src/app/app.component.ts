import { Component, OnDestroy  } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { Subscription } from 'rxjs'; // Para manejar la suscripción
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cartItemCount = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

}