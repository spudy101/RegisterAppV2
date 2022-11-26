import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service'; 
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.page.html',
  styleUrls: ['./listar-alumnos.page.scss'],
})
export class ListarAlumnosPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';

  alumno: any[] = [];

  constructor(private menu: MenuController,
     private crudAlumno: CrudAlumnoService,
    public toastCtrl: ToastController,
     private alertController: AlertController,
     public notifierService: NotificacionService,
     private auth: AuthService) { }

  ngOnInit(): void {
    this.getAlumno()
  }

  openMenu() {
    this.menu.toggle("three")
  }

  getAlumno() {
    this.crudAlumno.getAlumnos().subscribe(data => {
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


  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async eliminarAlumno(id: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Eliminar un Alumno',
      message: '¿Estas seguro que quieres eliminar al Alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = '';
          },
        },
        {
          text: 'confirmar',
          role: 'confirm',
          handler: async () => {
            this.crudAlumno.eliminarAlumno(id).then(() => {
              console.log('alumno eliminado con exito');
              this.presentToast('alumno eliminado con exito')
            }).catch(error => {
              console.log(error);
            })
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  salir() {
    this.auth.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }
}
