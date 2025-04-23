import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AppComponent,
    HomeComponent,
    ProductCardComponent,
    CartComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }