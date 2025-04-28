import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  navigateTo(path: string, fragment?: string): Promise<boolean> {
    if (fragment) {
      return this.router.navigate([path], { fragment }).then(() => {
        this.scrollToFragment(fragment);
        return true;
      });
    }
    return this.router.navigate([path]);
  }

  private scrollToFragment(fragment: string): void {
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        const offset = 80; // Altura del navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}