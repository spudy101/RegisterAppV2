import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioProfesorPageRoutingModule } from './formulario-profesor-routing.module';

import { FormularioProfesorPage } from './formulario-profesor.page';

import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioProfesorPageRoutingModule
  ],
  declarations: [FormularioProfesorPage]
})
export class FormularioProfesorPageModule {}
