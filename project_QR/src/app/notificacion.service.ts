import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from './notificacion/notificacion.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string, messageType: 'Error' | 'Correcto') {
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }
}
