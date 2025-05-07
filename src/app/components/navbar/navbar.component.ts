import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { filter, Subscription } from 'rxjs';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; 
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  activeSection: string = 'home';
  cartItemsCount: number = 0;
  private cartSubscription!: Subscription;
  private routerSubscription!: Subscription;
  isCartPulsing = false;
  currentRoute: string = '/';

  private authSubscription!: Subscription;
  isAuthenticated = false;
  userName = '';
  isUserMenuOpen: boolean = false;
  isLoggedIn: boolean = this.isAuthenticated;


  constructor(private cartService: CartService, 
    private router: Router, 
    private navigation: NavigationService,
    private authService: AuthService
  ) {}

// servicio de navegacion centralizada
  navItems = [
    { path: '/', fragment: 'home', label: 'Inicio' },
    { path: '/', fragment: 'categories', label: 'Categorías' },
    { path: '/products', label: 'Productos' },
    { path: '/', fragment: 'about-us', label: 'Nosotros' },
    { path: '/', fragment: 'contact', label: 'Contacto' }
  ];

  navigateTo(path: string, fragment?: string): void {
    this.navigation.navigateTo(path, fragment);
    this.isMenuOpen = false;
  }



  ngOnInit() {
    // Suscripción a los cambios en el carrito
    this.cartSubscription = this.cartService.getTotalQuantity().subscribe({
      next: (count: number) => {
        this.cartItemsCount = count;
        if (count > this.cartItemsCount) {
          this.triggerCartAnimation();
        }
      },
      error: (err) => {
        console.error('Error al obtener items del carrito:', err);
      }
    });

    // Suscripción a cambios de ruta
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

        // Suscripción a cambios de autenticación
        this.authSubscription = this.authService.currentUser.subscribe((user: { name: string; } | null) => {
          this.isAuthenticated = user !== null;
          this.userName = user?.name || '';
        });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
  }

  // ... (otros métodos se mantienen igual)

  scrollTo(sectionId: string) {
    this.isMenuOpen = false;
    
    if (this.currentRoute !== '/') {
      // Si no estamos en Home, navegamos primero a Home
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        this.scrollToSection(sectionId);
      });
    } else {
      // Si ya estamos en Home, hacemos scroll directamente
      this.scrollToSection(sectionId);
    }
  }

  private scrollToSection(sectionId: string) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Ajusta según la altura de tu navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Pequeño delay para asegurar que la página está cargada
  }

  goToHome() {
    this.router.navigate(['/']);
  }
  goToCart() {
    this.router.navigate(['/cart']);  
    
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


// metodos para el modo responsivo
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
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