import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    try {
      if (productId) {
        this.product = this.productService.getProductById(productId);
        this.relatedProducts = this.productService.getRelatedProducts(productId);
      }
    } catch (error) {
      // Redirigir a página de error o lista de productos
      this.router.navigate(['/products']);
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}