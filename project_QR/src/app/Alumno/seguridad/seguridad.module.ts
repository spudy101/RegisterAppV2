import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguridadPageRoutingModule } from './seguridad-routing.module';

import { SeguridadPage } from './seguridad.page';

import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SeguridadPageRoutingModule
  ],
  declarations: [SeguridadPage]
})
export class SeguridadPageModule {}
