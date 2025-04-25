import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  activeSection: string = 'home';
  cartItemsCount: number = 0;
  private cartSubscription!: Subscription;
  isCartPulsing = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Suscripción a los cambios en el carrito
    this.cartSubscription = this.cartService.getCartItems().subscribe({
      next: (items: Product[]) => {
        this.cartItemsCount = items.length;
        // Animación cuando se agrega un nuevo item
        if (items.length > this.cartItemsCount) {
          this.triggerCartAnimation();
        }
      },
      error: (err) => {
        console.error('Error al obtener items del carrito:', err);
      }
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  triggerCartAnimation() {
    this.isCartPulsing = true;
    setTimeout(() => {
      this.isCartPulsing = false;
    }, 500);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = ['home', 'categories', 'about-us', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    this.isMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToCart() {
    // Implementa la navegación al carrito aquí
    console.log('Navegando al carrito');
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMenuOpen) return;

    const target = event.target as HTMLElement;
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');

    // Si el click NO fue dentro del menú ni dentro del botón, lo cerramos
    if (
      menu && toggle &&
      !menu.contains(target) &&
      !toggle.contains(target)
    ) {
      this.closeMenu();
    }
  }
}