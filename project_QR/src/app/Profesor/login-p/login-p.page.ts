import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/seguridad/auth.service'; 
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service'; 
import { NotificacionService } from 'src/app/notificacion.service';


@Component({
  selector: 'app-login-p',
  templateUrl: './login-p.page.html',
  styleUrls: ['./login-p.page.scss'],
})
export class LoginPPage implements OnInit {
  credenciales = {
    correo: null,
    contrasena: null
  };

  profesor: any[] = [];

  constructor(public navCtrl: NavController,
     private auth: AuthService,
     public toastCtrl: ToastController,
     public database: CrudProfesorService,
     public notifierService: NotificacionService) { }

     ngOnInit(): void {
      this.getProfesor();
    }


  async mover2() {
    for (let profesor of this.profesor) {
      if (profesor.correo == this.credenciales.correo ) {

        console.log('credenciales :', this.credenciales);
        const res = await this.auth.login(this.credenciales.correo, this.credenciales.contrasena).catch(error => {
          console.log('error')
          this.notifierService.showNotification('Error de credenciales, vuelva a intentarlo!', 'Volver a intentar', 'Error');
        });
        if (res) {
          console.log('res -> ', res);
          this.notifierService.showNotification('Logeado con exito, Bienvenido!!!', 'Okey', 'Correcto');
          this.navCtrl.navigateForward("generar-qr");
        }
      } 
    }
  }

  getProfesor() {
    this.database.getProfesores().subscribe(data => {
      this.profesor = [];
      data.forEach((element: any) => {
        this.profesor.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.profesor);
    });
  }


}
