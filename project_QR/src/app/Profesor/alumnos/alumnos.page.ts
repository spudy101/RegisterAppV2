import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { cursoI, listaI } from 'src/app/modelos/models';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service';
import { CrudListaService } from 'src/app/servicios/cruds/crud-lista.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  nuevoCurso: cursoI = {
    titulo: '',
    nombre: '',
    cantidadAlumno: 0,
    profesorCargo: ''
  };

  nuevalista: listaI = {
    curso: '',
    fechaCreacion: '',
    horaCreacion: ''
  };

  alumno: any[] = [];

  uid: string | null;

  i = 0;

  curdoId = this.nuevalista.curso;

  constructor(private menu: MenuController, 
    private alertController: AlertController,
    private aRoute: ActivatedRoute,
    private router: Router,
    public database : CrudCursoService,
    public crudAlumno : CrudAlumnoService,
    private crudCurso: CrudCursoService,
    private crudLista: CrudListaService,
    public notifierService: NotificacionService,
    private auth: AuthService) { 
    this.uid = this.aRoute.snapshot.paramMap.get('id');
    console.log("parametro", this.uid)
  }

  ngOnInit(): void {
    this.getLista();
    this.getalumnos();
  }

  openMenu() {
    this.menu.toggle("second")
  }

  async guardar() {
    const alert = await this.alertController.create({
      header: 'Estas seguro que quieres guardar la asistencia',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  getLista() {
    const uid = this.uid;
    console.log("lista id:",uid)
    if(uid !== null){
      this.crudLista.getLista(uid).subscribe(data=>{
        console.log("id:",uid)
        var x : listaI;
        x=data;
        console.log("curso lista id:",x.curso)
        this.nuevalista.curso=x.curso
        this.nuevalista.fechaCreacion=x.fechaCreacion
        this.nuevalista.horaCreacion=x.horaCreacion
        this.obtenercurso(x.curso);
      });
    }
  }

  getalumnos() {
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

  obtenercurso(id: string ) {
    console.log("curso id:",id)
    if(id !== null){
      this.database.getCurso(id).subscribe(data=>{
        console.log("id:",id)
        var x : cursoI;
        x=data;
        this.nuevoCurso.nombre=x.nombre;
        this.nuevoCurso.titulo=x.titulo;
        this.nuevoCurso.cantidadAlumno=x.cantidadAlumno;
        this.nuevoCurso.profesorCargo=x.profesorCargo;
      });
    }
  }

  async eliminar() {
    const alert = await this.alertController.create({
      header: 'Estas seguro que quieres eliminar la asistencia',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  message = '';
  fecha: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.fecha, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
    }
  }

  salir() {
    this.auth.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }
}

