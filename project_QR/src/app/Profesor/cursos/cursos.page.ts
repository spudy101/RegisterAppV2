import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  curso: any[] = [];
  alumno: any[] = [];

  uid: string | null;

  contador: number;

  constructor(private menu: MenuController,
     private crudCurso: CrudCursoService,
    public toastCtrl: ToastController,
     private alertController: AlertController,
    private auth: AuthService,
     public crudAlumno : CrudAlumnoService,
    public notifierService: NotificacionService) { 
      
    }

    async ngOnInit() {
      const uid = await this.auth.getid();
      if(uid) {
        this.uid = uid
      }
      console.log('uid auth->', this.uid)
      this.getCursos ();
    }

  openMenu(){
    this.menu.toggle("second")
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

  salir() {
    this.auth.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }

}
