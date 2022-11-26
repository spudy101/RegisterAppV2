import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { cursoI } from 'src/app/modelos/models';
import { NotificacionService } from 'src/app/notificacion.service';
import { CrudCursoService } from 'src/app/servicios/cruds/crud-curso.service';
import { CrudListaService } from 'src/app/servicios/cruds/crud-lista.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  lista: any[] = [];

  uid: string | null;

  nuevoCurso: cursoI = {
    titulo: '',
    nombre: '',
    cantidadAlumno: 0,
    profesorCargo: ''
  };


  constructor(private menu: MenuController, private crudLista: CrudListaService,
    public toastCtrl: ToastController, private alertController: AlertController,
    private aRoute: ActivatedRoute,
    public database: CrudCursoService,
    public notifierService: NotificacionService,
    private auth: AuthService) { 
      this.uid = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.uid)
    }

    async ngOnInit() {

      this.getListas();
      this.obtenercurso();
    }

  openMenu(){
    this.menu.toggle("second")
  }

  getListas() {
    this.crudLista.getListas().subscribe(data => {
      this.lista = [];
      data.forEach((element: any) => {
        this.lista.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.lista);
    });
  }

  obtenercurso() {
    this.uid = this.uid;
    console.log("id:",this.uid)
    if(this.uid !== null){
      this.database.getCurso(this.uid).subscribe(data=>{
        console.log("id:",this.uid)
        var x : cursoI;
        x=data;
        this.nuevoCurso.nombre=x.nombre;
        this.nuevoCurso.titulo=x.titulo;
        this.nuevoCurso.cantidadAlumno=x.cantidadAlumno;
        this.nuevoCurso.profesorCargo=x.profesorCargo;

      });
    }
  }

  salir() {
    this.auth.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }
}
