import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service'; 
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.page.html',
  styleUrls: ['./listar-cursos.page.scss'],
})
export class ListarCursosPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';

  curso: any[] = [];

  constructor(private menu: MenuController,
     private crudCurso: CrudCursoService,
    public toastCtrl: ToastController, 
    private alertController: AlertController,
    public notifierService: NotificacionService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getCursos()
  }

  openMenu() {
    this.menu.toggle("three")
  }

  getCursos() {
    this.crudCurso.getCursos().subscribe(data => {
      this.curso = [];
      data.forEach((element: any) => {
        this.curso.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.curso);
    });
  }


  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async eliminarCurso(id: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Eliminar un Curso',
      message: '¿Estas seguro que quieres eliminar al Curso?',
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
            this.crudCurso.eliminarCurso(id).then(() => {
              console.log('curso eliminado con exito');
              this.presentToast('curso eliminado con exito')
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
