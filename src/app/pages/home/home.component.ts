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