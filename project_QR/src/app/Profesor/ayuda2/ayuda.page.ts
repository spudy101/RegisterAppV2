import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificacionService } from 'src/app/notificacion.service';
import { AuthService } from 'src/app/servicios/seguridad/auth.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(private menu: MenuController,
    public notifierService: NotificacionService,
    private auth: AuthService) {}

  ngOnInit() {
  }

  openMenu(){
    this.menu.toggle("second")
  }

  salir() {
    this.auth.salir();
    this.notifierService.showNotification('Inicio de sesion cerrado, Hasta luego!', 'Okey', 'Correcto');
  }

}
