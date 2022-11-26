import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { alumnoI, profesorI } from 'src/app/modelos/models';
import { AuthAlumnoService } from 'src/app/servicios/seguridad/auth-alumno.service';
import { Router } from '@angular/router';
import { CrudAlumnoService } from 'src/app/servicios/cruds/crud-alumno.service';
import { NotificacionService } from 'src/app/notificacion.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;
  content_visibility = '';

  nuevolumno: alumnoI = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    cursoP: ''
  };

  uid!: string | null;
  code: any;

  constructor(private menu: MenuController,
    private alertController: AlertController,
    public navCtrl: NavController,
    private auth: AuthAlumnoService,
    private router: Router,
    public crudalumno : CrudAlumnoService,
    public notifierService: NotificacionService,
    private barcodeScanner: BarcodeScanner) {

  }


  async ngOnInit() {
    const uid = await this.auth.getid();
    if (uid) {
      this.uid = uid
    }
    console.log('uid auth->', this.uid)
    this.obtenerProfesor();
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  obtenerProfesor() {

    if(this.uid !== null){
      this.crudalumno.getAlumno(this.uid).subscribe(data=>{
        
        var x : alumnoI;
        x=data;
        this.nuevolumno.nombre=x.nombre;
        this.nuevolumno.apellido=x.apellido;
        this.nuevolumno.correo=x.correo;
        this.nuevolumno.contrasena=x.contrasena;
        this.nuevolumno.cursoP=x.cursoP;
      });
    } 
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {

      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
