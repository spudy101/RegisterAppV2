import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service'; 

@Component({
  selector: 'app-login-a',
  templateUrl: './login-a.page.html',
  styleUrls: ['./login-a.page.scss'],
})
export class LoginAPage implements OnInit {

  credenciales = {
    correo: null,
    contrasena: null
  };

  constructor(
    public navCtrl: NavController,
     private auth: AuthService,
      public toastCtrl: ToastController,
      public notifierService: NotificacionService) { }

  ngOnInit() {}


  async mover2(){
    console.log('credenciales :', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.contrasena).catch(error => {
      console.log('error')
      this.notifierService.showNotification('Error de credenciales, vuelva a intentarlo!', 'Volver a intentar', 'Error');
    });
    if (res) {
      console.log('res -> ', res);
      this.notifierService.showNotification('Logeado con exito, Bienvenido!!!', 'Okey', 'Correcto');
      this.navCtrl.navigateForward("listar-profesores");
    }
  }


}
