import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { profesorI } from '../../modelos/models';
import { AuthService } from 'src/app/servicios/seguridad/auth.service'; 
import { CrudProfesorService } from 'src/app/servicios/cruds/crud-profesor.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-profesor',
  templateUrl: './formulario-profesor.page.html',
  styleUrls: ['./formulario-profesor.page.scss'],
})
export class FormularioProfesorPage implements OnInit {
  titulo: string;
  subtitulo: string;

  nuevoProfesor: profesorI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  };
  loading: any;
  id: string | null;



  constructor(private auth: AuthService, 
    public toastCtrl: ToastController, 
    public loadingController: LoadingController,
    public database : CrudProfesorService,
    public navCtrl: NavController,
    private menu: MenuController,
    private aRoute: ActivatedRoute,
    private router: Router) { 
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id)
    }

  ngOnInit(): void {
    this.editar();
  }

  openMenu() {
    this.menu.toggle("three")
  }

  agregarEditar(){
    if(this.id === null){
      this.agregarProfesor();
    } else {
      this.editarProfesor(this.id);
    }
  }

  async agregarProfesor() {
    console.log('datos ->', this.nuevoProfesor);
    const res = await this.auth.registrarUser(this.nuevoProfesor).catch( error => {
      console.log('error');
    });
    if (res) {
      console.log('Exito al crear el profesor')
      const path = 'profesores';
      const id = res.user.uid;
      var fechacreada = new Date();
      var horacreada = new Date();
      this.nuevoProfesor.fechaCreacion = fechacreada.toLocaleDateString("es-US");
      this.nuevoProfesor.horaCreacion = horacreada.toLocaleTimeString("en-US");
      var fechamodificada = new Date();
      var horamodificada = new Date();
      this.nuevoProfesor.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
      this.nuevoProfesor.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
      await this.database.agregarProfesor(this.nuevoProfesor, path, id)
      this.presentToast('Profesor guardado correctamente');
      this.navCtrl.navigateForward("listar-profesores");
    }
  }

  editarProfesor(id: string) {

    this.loading = true;
    var fechamodificada = new Date();
    var horamodificada = new Date();
    this.nuevoProfesor.fechaActualizacion = fechamodificada.toLocaleDateString("es-US");
    this.nuevoProfesor.horaActualizacion = horamodificada.toLocaleTimeString("en-US");
    this.database.actualizarProfesor(id, this.nuevoProfesor).then(() => {
      this.loading = false;
      this.presentToast('prefesor modificado con exito')
      this.router.navigate(['/listar-profesores']);
    })

  }

  editar() {
    this.subtitulo = 'Editar al profesor uwu'
    this.titulo = 'Editar Profesor'
    if(this.id !== null){
     
      this.database.getProfesor(this.id).subscribe(data=>{
        
        var x : profesorI;
        x=data;
        this.nuevoProfesor.nombre=x.nombre;
        this.nuevoProfesor.apellido=x.apellido;
        this.nuevoProfesor.correo=x.correo;
        this.nuevoProfesor.contrasena=x.contrasena;

      });
    } else {
      this.subtitulo = 'Ingresar un nuevo profesor'
      this.titulo = 'Agregar Profesor'
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

