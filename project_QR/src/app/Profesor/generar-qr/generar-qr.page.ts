import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { cursoI, listaI, profesorI } from 'src/app/modelos/models';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service';
import { CrudListaService } from 'src/app/servicios/cruds/crud-lista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service';
import { NotificacionService } from 'src/app/notificacion.service';


@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})


export class GenerarQrPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';

  myAngularxQrCode = '';

  allowEmptyString=true;

  nuevoLista: listaI = {
    curso: ''
  };

  nuevoProfesor: profesorI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  };

  nuevoCurso: cursoI = {
    titulo: '',
    nombre: '',
    cantidadAlumno: 0,
    profesorCargo: ''
  };

  curso: any[] = [];

  uid: string | null;

  idLista: string | null;

  cursoId: string | null;


  constructor(private menu: MenuController,
    private alertController: AlertController,
    public database: CrudCursoService,
    public crudLista: CrudListaService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private auth: AuthService,
    private router: Router,
    public crudProfesor : CrudProfesorService,
    public notifierService: NotificacionService) {

  }


  async ngOnInit() {
    const uid = await this.auth.getid();
    if (uid) {
      this.uid = uid
    }
    console.log('uid auth->', this.uid)
    this.getCurso();
    this.obtenerProfesor();
  }

  openMenu() {
    this.menu.toggle("second")
  }

  getCurso() {
    if (this.uid !== null) {
      this.database.getCursos().subscribe(data => {

        this.curso = [];
        data.forEach((element: any) => {
          this.curso.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.curso);
      })
    }
  }

  obtenerProfesor() {

    if(this.uid !== null){
      this.crudProfesor.getProfesor(this.uid).subscribe(data=>{
        
        var x : profesorI;
        x=data;
        this.nuevoProfesor.nombre=x.nombre;
        this.nuevoProfesor.apellido=x.apellido;
        this.nuevoProfesor.correo=x.correo;
        this.nuevoProfesor.contrasena=x.contrasena;

      });
    } 
  }

  obtenercurso() {
    this.cursoId = this.nuevoLista.curso;
    console.log("id:",this.cursoId)
    if(this.cursoId !== null){
      this.database.getCurso(this.cursoId).subscribe(data=>{
        console.log("id:",this.cursoId)
        var x : cursoI;
        x=data;
        this.nuevoCurso.nombre=x.nombre;
        this.nuevoCurso.titulo=x.titulo;
        this.nuevoCurso.cantidadAlumno=x.cantidadAlumno;
        this.nuevoCurso.profesorCargo=x.profesorCargo;

      });
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Usted esta generando un QR',
      message: '¿Quieres generar un QR?',
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
            if (this.nuevoLista.curso.length > 1 ) {
              this.handlerMessage = 'Escanea tu codigo Aqui';
              console.log('Exito al crear la lista')
              const path = 'listas';
              const id = this.database.createid();
              this.idLista = id;
              var fechacreada = new Date();
              var horacreada = new Date();
              this.nuevoLista.fechaCreacion = fechacreada.toLocaleDateString("es-US");
              this.nuevoLista.horaCreacion = horacreada.toLocaleTimeString("en-US");
              var fechamodificada = new Date();
              var horamodificada = new Date();
              this.nuevoLista.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
              this.nuevoLista.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
              
              this.obtenercurso();
              const codigo={
                profesor:this.nuevoProfesor.nombre,
                seccion:this.nuevoLista.curso,
                dia:this.nuevoLista.fechaCreacion,
                hora:this.nuevoLista.horaCreacion,
              }
              const qrData=JSON.stringify(codigo);
              this.myAngularxQrCode = qrData;
              await this.crudLista.agregarLista(this.nuevoLista, path, id)
              this.notifierService.showNotification('Codigo Qr generado correctamente, lista creada!', 'Okey', 'Correcto');
            } else {
              this.notifierService.showNotification('Debes seleccionar un curso, Vuelve a intentarlo!', 'Volver a intentar', 'Error');
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
