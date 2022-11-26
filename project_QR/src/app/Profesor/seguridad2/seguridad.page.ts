import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { profesorI } from 'src/app/modelos/models';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';

  nuevoProfesor: profesorI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  }; 

  loading: any;
  id: string | null;

  constructor(private menu: MenuController, private alertController: AlertController,
    private auth: AuthService, 
    public toastCtrl: ToastController, 
    public loadingController: LoadingController,
    public database : CrudProfesorService,
    public navCtrl: NavController,
    private aRoute: ActivatedRoute,
    private router: Router,
    public notifierService: NotificacionService) {

   }

   async ngOnInit() {
    const uid = await this.auth.getid();
    if (uid) {
      this.id = uid
    }
    console.log('uid auth->', this.id)
    this.editar();
  }

  openMenu() {
    this.menu.toggle("second")
  }


  editar() {
    if(this.id !== null){
     
      this.database.getProfesor(this.id).subscribe(data=>{
        
        var x : profesorI;
        x=data;
        this.nuevoProfesor.nombre=x.nombre;
        this.nuevoProfesor.apellido=x.apellido;
        this.nuevoProfesor.correo=x.correo;
        this.nuevoProfesor.contrasena=x.contrasena;

      });
    } 
  }

  async Cambiarnombre() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '¿Quieres cambiar tu usuario?',
      message: 'Confirme su peticion',
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
          handler: () => {
            if (this.nuevoProfesor.nombre.length > 1) {
            var fechamodificada = new Date();
            var horamodificada = new Date();
            this.nuevoProfesor.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
            this.nuevoProfesor.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
            this.database.actualizarProfesor(this.id, this.nuevoProfesor).then(() => {
              this.loading = false;
              this.notifierService.showNotification('Profesor modificado con exito!', 'Okey', 'Correcto');
            })
          } else {
            this.notifierService.showNotification('debe ingresar un nombre o apellido', 'Volver a intentar', 'Error');
          }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async cambiarApellido() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '¿Quieres cambiar tu usuario?',
      message: 'Confirme su peticion',
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
          handler: () => {
            if (this.nuevoProfesor.apellido.length > 1) {
            var fechamodificada = new Date();
            var horamodificada = new Date();
            this.nuevoProfesor.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
            this.nuevoProfesor.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
            this.database.actualizarProfesor(this.id, this.nuevoProfesor).then(() => {
              this.loading = false;
              this.notifierService.showNotification('Profesor modificado con exito!', 'Okey', 'Correcto');
            })
          } else {
            this.notifierService.showNotification('debe ingresar un nombre o apellido', 'Volver a intentar', 'Error');
          }
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
