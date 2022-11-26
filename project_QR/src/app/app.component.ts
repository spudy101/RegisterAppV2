import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from './servicios/seguridad/auth.service'; 
import { AuthAlumnoService } from './servicios/seguridad/auth-alumno.service'; 
import { NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(    
    private router: Router,
    private platform: Platform,
    private AuthServ: AuthService, 
    public toastCtrl: ToastController,
    private AuthServAlumno: AuthAlumnoService,
    public notifierService: NotificacionService
    ) {
      //this.inicializar();
      //this.inicializar2();
    }

  inicializar(){
    this.platform.ready().then((resp)=>{
      this.AuthServ.authState.subscribe(state=>{
        console.log('Estado de la aplicacion:'+state);
        if (state) {
          this.router.navigate(['generar-qr']);
        } else {
          this.router.navigate(['login-p']);
        }
      })
    });
  }

  inicializar2(){
    this.platform.ready().then((resp)=>{
      this.AuthServAlumno.authState.subscribe(state=>{
        console.log('Estado de la aplicacion:'+state);
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      })
    });
  }

  salir() {
    this.AuthServ.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }
}
