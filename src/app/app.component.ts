import { Component, OnDestroy  } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Subscription } from 'rxjs'; // Para manejar la suscripción


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  cartItemCount = 0;

  constructor(private cartService: CartService) {
    cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}