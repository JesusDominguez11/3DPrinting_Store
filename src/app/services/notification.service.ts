import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private defaultDuration = 3000;

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: NotificationType = 'success', duration?: number) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: duration || this.defaultDuration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['notification', type],
      data: { message, type }
    });
  }
}