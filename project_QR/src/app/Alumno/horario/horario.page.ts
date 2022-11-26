import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  constructor(private menu: MenuController) {}

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
