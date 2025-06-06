import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Route, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIcon, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductService,

    private cartService: CartService
  ) {}

  featuredProducts: Product[] = [];
  
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4); // Aquí products ya es un array
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Producto añadido:', product);
  }

  categories = [
    { name: 'Videojuegos', image: 'assets/images/videogames_2737379.png' },
    { name: 'Películas', image: 'assets/images/movies_2459778.png' },
    { name: 'Anime', image: 'assets/images/anime_category.png' },
    { name: 'Personalizadas', image: 'assets/images/custom.png' }
  ];

}