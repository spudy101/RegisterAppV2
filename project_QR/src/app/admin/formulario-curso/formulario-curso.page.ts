import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { cursoI } from '../../modelos/models';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service'; 
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service'; 
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-curso',
  templateUrl: './formulario-curso.page.html',
  styleUrls: ['./formulario-curso.page.scss'],
})
export class FormularioCursoPage implements OnInit {

  titulo: string;
  subtitulo: string;

  nuevoCurso: cursoI = {
    titulo: '',
    nombre: '',
    cantidadAlumno: 0,
    profesorCargo: ''
  };
  
  loading: any;
  id: string | null;

  profesor: any[] = [];

  constructor(
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public database: CrudCursoService,
    public crudProfesor: CrudProfesorService,
    public navCtrl: NavController,
    private menu: MenuController,
    private aRoute: ActivatedRoute,
    private router: Router) { 
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id)
    }

    ngOnInit(): void {
      this.editar();
      this.getProfesor()
    }

    openMenu() {
      this.menu.toggle("three")
    }

    agregarEditar(){
      if(this.id === null){
        this.agregarCurso();
      } else {
        this.editarCursor(this.id);
      }
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
        console.log(this.profesor);
      });
    }

  async agregarCurso() {
      console.log('Exito al crear el curso')
      const path = 'cursos';
      const id = this.database.createid();
      this.nuevoCurso.fechaCreacion = new Date();
      this.nuevoCurso.fechaActualizacion = new Date();
      await this.database.agregarECurso(this.nuevoCurso, path, id)
      this.presentToast('Curso guardado correctamente');
      this.navCtrl.navigateForward("listar-cursos");

  }

  editarCursor(id: string) {

    this.loading = true;
    this.nuevoCurso.fechaActualizacion = new Date();
    this.database.actualizarCurso(id, this.nuevoCurso).then(() => {
      this.loading = false;
      this.presentToast('Curso modificado con exito')
      this.router.navigate(['/listar-cursos']);
    })

  }

  
  editar() {
    this.subtitulo = 'Editar al Curso uwu'
    this.titulo = 'Editar Curso'
    if(this.id !== null){
     
      this.database.getCurso(this.id).subscribe(data=>{
        
        var x : cursoI;
        x=data;
        this.nuevoCurso.nombre=x.nombre;
        this.nuevoCurso.titulo=x.titulo;
        this.nuevoCurso.cantidadAlumno=x.cantidadAlumno;
        this.nuevoCurso.profesorCargo=x.profesorCargo;

      });
    } else {
      this.subtitulo = 'Ingresar un nuevo Curso'
      this.titulo = 'Agregar Curso'
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
