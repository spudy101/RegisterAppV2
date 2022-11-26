import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { alumnoI } from 'src/app/modelos/models';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service';
import { AuthAlumnoService } from 'src/app/servicios/seguridad/auth-alumno.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage {

  id!: string | null;

  handlerMessage = '';
  roleMessage = '';

  nuevoAlumno: alumnoI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    cursoP: '',
    fechaCreacion: '',
    horaCreacion: ''
  }; 

  amodificarAlumno: alumnoI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    cursoP: ''
  }; 

  loading: any;

  constructor(private menu: MenuController,
     private alertController: AlertController,
    private auth: AuthAlumnoService,  
    public loadingController: LoadingController,
    public database : CrudAlumnoService,
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

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  editar() {
    if(this.id !== null){
     
      this.database.getAlumno(this.id).subscribe(data=>{
        
        var x : alumnoI;
        x=data;
        this.nuevoAlumno.nombre=x.nombre;
        this.nuevoAlumno.apellido=x.apellido;
        this.nuevoAlumno.correo=x.correo;
        this.nuevoAlumno.contrasena=x.contrasena;
        this.nuevoAlumno.cursoP=x.cursoP;
        this.nuevoAlumno.fechaCreacion=x.fechaCreacion;
        this.nuevoAlumno.horaCreacion=x.horaCreacion;
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
            if (this.amodificarAlumno.nombre.length > 1) {
              this.amodificarAlumno.apellido = this.nuevoAlumno.apellido;
              this.amodificarAlumno.contrasena = this.nuevoAlumno.contrasena;
              this.amodificarAlumno.correo = this.nuevoAlumno.correo;
              this.amodificarAlumno.fechaCreacion = this.nuevoAlumno.fechaCreacion;
              this.amodificarAlumno.horaCreacion = this.nuevoAlumno.horaCreacion;
              this.amodificarAlumno.cursoP = this.nuevoAlumno.cursoP;
              var fechamodificada = new Date();
              var horamodificada = new Date();
              this.amodificarAlumno.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
              this.amodificarAlumno.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
              this.database.actualizarAlumno(this.id, this.amodificarAlumno).then(() => {
                this.loading = false;
                this.notifierService.showNotification('Alumno modificado con exito!', 'Okey', 'Correcto');
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
            if (this.amodificarAlumno.apellido.length > 1) {
              this.amodificarAlumno.nombre = this.nuevoAlumno.nombre;
              this.amodificarAlumno.contrasena = this.nuevoAlumno.contrasena;
              this.amodificarAlumno.correo = this.nuevoAlumno.correo;
              this.amodificarAlumno.fechaCreacion = this.nuevoAlumno.fechaCreacion;
              this.amodificarAlumno.horaCreacion = this.nuevoAlumno.horaCreacion;
              this.amodificarAlumno.cursoP = this.nuevoAlumno.cursoP;
              var fechamodificada = new Date();
              var horamodificada = new Date();
              this.nuevoAlumno.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
              this.nuevoAlumno.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
              this.database.actualizarAlumno(this.id, this.amodificarAlumno).then(() => {
                this.loading = false;
                this.notifierService.showNotification('Alumno modificado con exito!', 'Okey', 'Correcto');
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
}
