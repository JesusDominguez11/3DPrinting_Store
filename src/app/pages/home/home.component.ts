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
  featuredProducts: Product[] = [];
  currentSlide = 0;
  currentOffset = 0;
  itemWidth = 0; // Se calculará dinámicamente
  dots: number[] = [];

  categories = [
    { name: 'Videojuegos', image: 'assets/images/videogames_2737379.png' },
    { name: 'Películas', image: 'assets/images/movies_2459778.png' },
    { name: 'Anime', image: 'assets/images/anime_category.png' },
    { name: 'Personalizadas', image: 'assets/images/custom.png' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.featuredProducts = this.productService.getProducts().slice(0, 4);
    this.dots = Array(this.featuredProducts.length).fill(0).map((x, i) => i);
    
    // Calcular el ancho del item después de que la vista se haya renderizado
    setTimeout(() => {
      const container = document.querySelector('.carousel-container');
      if (container) {
        this.itemWidth = container.clientWidth;
      }
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Producto añadido:', product);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.currentOffset = -(this.currentSlide * this.itemWidth);
  }

  nextSlide() {
    if (this.currentSlide < this.featuredProducts.length - 1) {
      this.currentSlide++;
      this.currentOffset = -(this.currentSlide * this.itemWidth);
    } else {
      this.currentSlide = 0;
      this.currentOffset = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.currentOffset = -(this.currentSlide * this.itemWidth);
    } else {
      this.currentSlide = this.featuredProducts.length - 1;
      this.currentOffset = -(this.currentSlide * this.itemWidth);
    }
  }
}