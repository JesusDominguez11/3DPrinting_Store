import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIcon],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  featuredProducts: Product[] = [];

    currentSlide = 0;
    currentOffset = 0;
    itemWidth = 300; // Ajusta según el ancho de tus cards
    visibleItems = 3; // Cantidad de items visibles a la vez
    dots: number[] = [];

ngOnInit() {
  this.featuredProducts = this.productService.getProducts().slice(0, 4); // Muestra solo 4 productos destacados
  this.dots = Array(Math.ceil(this.featuredProducts.length / this.visibleItems)).fill(0).map((x, i) => i);
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

  goToSlide(index: number) {
    this.currentSlide = index;
    this.currentOffset = -(index * this.itemWidth * this.visibleItems);
  }

  nextSlide() {
    const maxSlides = Math.ceil(this.featuredProducts.length / this.visibleItems) - 1;
    if (this.currentSlide < maxSlides) {
      this.currentSlide++;
      this.currentOffset = -(this.currentSlide * this.itemWidth * this.visibleItems);
    } else {
      // Opcional: volver al inicio
      this.currentSlide = 0;
      this.currentOffset = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.currentOffset = -(this.currentSlide * this.itemWidth * this.visibleItems);
    } else {
      // Opcional: ir al final
      const maxSlides = Math.ceil(this.featuredProducts.length / this.visibleItems) - 1;
      this.currentSlide = maxSlides;
      this.currentOffset = -(maxSlides * this.itemWidth * this.visibleItems);
    }
  }
  
}