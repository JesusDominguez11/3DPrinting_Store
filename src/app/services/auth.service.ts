import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
  id: number;
  username: string;
  email: string;
  password: string; // En una app real, esto debería estar hasheado
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Usuarios "hardcodeados" - en una app real esto vendría de una API
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Administrador'
    },
    {
      id: 2,
      username: 'usuario',
      email: 'usuario@example.com',
      password: 'usuario123',
      name: 'Usuario Normal'
    }
  ];

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulamos un delay de API
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.users.find(
          u => u.username === username && u.password === password
        );

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  getUserName(): string {
    return this.currentUserValue?.name || '';
  }
}