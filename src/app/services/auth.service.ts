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
  private usersKey = '3dverse_users';

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

  register(username: string, email: string, password: string): Observable<boolean> {
    return of(null).pipe(
      delay(500), // Simulamos tiempo de respuesta
      map(() => {
        const users = this.getUsers();
        
        // Verificar si el usuario o email ya existen
        const usernameExists = users.some(u => u.username === username);
        const emailExists = users.some(u => u.email === email);

        if (usernameExists || emailExists) {
          throw new Error(usernameExists ? 'El nombre de usuario ya existe' : 'El email ya está registrado');
        }

        // Crear nuevo usuario
        const newUser: User = {
          id: this.generateId(),
          username,
          email,
          password, // En producción, esto debería estar hasheado
          name: username // Podrías añadir un campo para nombre completo
        };

        // Guardar nuevo usuario
        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        // Autologin después del registro
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);

        return true;
      })
    );
  }

  /**
   * Obtiene todos los usuarios registrados
   * @returns Array de usuarios
   */
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  /**
   * Genera un nuevo ID para el usuario
   * @returns Nuevo ID numérico
   */
  private generateId(): number {
    const users = this.getUsers();
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}