import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthAlumnoService } from 'src/app/servicios/seguridad/auth-alumno.service'; 
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service'; 
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service'; 
import { NotificacionService } from 'src/app/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
    correo: null,
    contrasena: null
  };

  alumno: any[] = [];

  constructor(public navCtrl: NavController,
    private auth: AuthAlumnoService,
    public toastCtrl: ToastController,
    public database: CrudAlumnoService,
    public notifierService: NotificacionService) { }

  ngOnInit(): void {
    this.getAlumno()
  }

  async mover2() {
    for (let alumno of this.alumno) {
      if (alumno.correo == this.credenciales.correo ) {

        console.log('credenciales :', this.credenciales);
        const res = await this.auth.login(this.credenciales.correo, this.credenciales.contrasena).catch(error => {
          console.log('error')
          this.notifierService.showNotification('Error de credenciales, vuelva a intentarlo!', 'Volver a intentar', 'Error');
        });
        if (res) {
          console.log('res -> ', res);
          this.notifierService.showNotification('Logeado con exito, Bienvenido!!!', 'Okey', 'Correcto');
          this.navCtrl.navigateForward("home");
        }
      } 
    }
  }

  getAlumno() {
    this.database.getAlumnos().subscribe(data => {
      this.alumno = [];
      data.forEach((element: any) => {
        this.alumno.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.alumno);
    });
  }


}
