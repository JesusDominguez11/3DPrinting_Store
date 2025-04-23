import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];

  featuredProducts: Product[] = [];

ngOnInit() {
  this.featuredProducts = this.productService.getProducts().slice(0, 4); // Muestra solo 4 productos destacados
}

categories = [
  { name: 'Videojuegos', image: 'assets/images/videogames_2737379.png' },
  { name: 'Películas', image: 'assets/images/movies_2459778.png' },
  { name: 'Anime', image: 'assets/images/anime_category.png' },
  { name: 'Personalizadas', image: 'assets/images/custom.png' }
];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = this.productService.getProducts();
  }

  onAddToCart(product: Product) { // Asegúrate de recibir Product
    this.cartService.addToCart(product);
    console.log('Producto añadido:', product); // Verifica en consola
  }
}