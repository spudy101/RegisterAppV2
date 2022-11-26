import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service'; 
import { AuthService } from 'src/app/servicios/seguridad/auth.service';


@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.page.html',
  styleUrls: ['./listar-profesores.page.scss'],
})
export class ListarProfesoresPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';

  profesor: any[] = [];

  constructor(private menu: MenuController, 
    private crudProfesor: CrudProfesorService,
    public toastCtrl: ToastController,
     private alertController: AlertController,
    public notifierService: NotificacionService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getProfesor()
  }

  openMenu() {
    this.menu.toggle("three")
  }

  getProfesor() {
    this.crudProfesor.getProfesores().subscribe(data => {
      this.profesor = [];
      data.forEach((element: any) => {
        this.profesor.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log('PROF:'+this.profesor);
    });
  }


  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async eliminarProfesor(id: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Eliminar un profesor',
      message: '¿Estas seguro que quieres eliminar al profesor?',
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
            this.crudProfesor.eliminarProfesor(id).then(() => {
              console.log('profesor eliminado con exito');
              this.presentToast('profesor eliminado con exito')
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
