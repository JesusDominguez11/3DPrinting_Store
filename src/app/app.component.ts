import { Component, OnDestroy  } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; 
import { filter, Subscription } from 'rxjs'; // Para manejar la suscripción
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cartItemCount = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private api: ApiService
  ) {

    
    this.testApiConnection();

    //para manejar el numero de items en el carrito
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });

    //para manejar la posicion en la pagina al cambiar de paginas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  testApiConnection() {
    this.api.testConnection().subscribe({
      next: (response) => {
        console.log('✅ Conexión exitosa! Respuesta:', response);
      },
      error: (error) => {
        console.error('❌ Error de conexión:', error);
      }
    });
  }

  //para navegar al carrito (depurar si aun es necesario esto)
  navigateToCart() {
    this.router.navigate(['/cart']);
  }

}