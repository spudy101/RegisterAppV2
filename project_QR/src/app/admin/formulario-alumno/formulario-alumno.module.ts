import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAlumnoPageRoutingModule } from './formulario-alumno-routing.module';

import { FormularioAlumnoPage } from './formulario-alumno.page';
import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAlumnoPageRoutingModule
  ],
  declarations: [FormularioAlumnoPage]
})
export class FormularioAlumnoPageModule {}
