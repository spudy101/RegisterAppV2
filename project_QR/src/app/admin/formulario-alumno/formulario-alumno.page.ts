import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { alumnoI } from 'src/app/modelos/models';
import { AuthAlumnoService } from 'src/app/servicios/seguridad/auth-alumno.service';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service';
import { NotificacionService } from 'src/app/notificacion.service';


@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.page.html',
  styleUrls: ['./formulario-alumno.page.scss'],
})
export class FormularioAlumnoPage implements OnInit {
  subtitulo: string;
  titulo: string;
  curso: any[] = [];

  nuevoAlumno: alumnoI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    cursoP: ''
  };
  loading: any;
  id: string | null;

  constructor(private auth: AuthAlumnoService,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public database: CrudAlumnoService,
    public crudCurso: CrudCursoService,
    public navCtrl: NavController,
    private menu: MenuController,
    private aRoute: ActivatedRoute,
    private router: Router,
    public notifierService: NotificacionService) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.editar();
    this.getCursos();
  }

  openMenu() {
    this.menu.toggle("three")
  }

  agregarEditar() {
    if (this.id === null) {
      this.agregarAlumno();
    } else {
      this.editarAlumno(this.id);
    }
  }

  async agregarAlumno() {
    console.log('datos ->', this.nuevoAlumno);
    const res = await this.auth.registrarUser(this.nuevoAlumno).catch(error => {
      console.log('error');
    });
    if (res) {
      console.log('Exito al crear el Alumno')
      const path = 'alumnos';
      const id = res.user.uid;
      var fechacreada = new Date();
      var horacreada = new Date();
      this.nuevoAlumno.fechaCreacion = fechacreada.toLocaleDateString("es-US");
      this.nuevoAlumno.horaCreacion = horacreada.toLocaleTimeString("en-US");
      var fechamodificada = new Date();
      var horamodificada = new Date();
      this.nuevoAlumno.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
      this.nuevoAlumno.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
      await this.database.agregarAlumno(this.nuevoAlumno, path, id)
      this.notifierService.showNotification('Alumno creado con exito!', 'Okey', 'Correcto');
      this.navCtrl.navigateForward("listar-alumnos");
    }
  }

  editarAlumno(id: string) {

    this.loading = true;
    var fechamodificada = new Date();
    var horamodificada = new Date();
    this.nuevoAlumno.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
    this.nuevoAlumno.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
    this.database.actualizarAlumno(id, this.nuevoAlumno).then(() => {
      this.loading = false;
      this.notifierService.showNotification('Alumno modificado con exito!', 'Okey', 'Correcto');
      this.router.navigate(['/listar-alumnos']);
    })

  }

  editar() {
    this.subtitulo = 'Editar al Alumno uwu'
    this.titulo = 'Editar Alumno'
    if(this.id !== null){
     
      this.database.getAlumno(this.id).subscribe(data=>{
        
        var x : alumnoI;
        x=data;
        this.nuevoAlumno.nombre=x.nombre;
        this.nuevoAlumno.apellido=x.apellido;
        this.nuevoAlumno.correo=x.correo;
        this.nuevoAlumno.contrasena=x.contrasena;
        this.nuevoAlumno.cursoP=x.cursoP;
      });
    } else {
      this.subtitulo = 'Ingresar un nuevo Alumno'
      this.titulo = 'Agregar Alumno'
    }
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

}
