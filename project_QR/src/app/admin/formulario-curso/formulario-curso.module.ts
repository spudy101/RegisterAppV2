import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioCursoPageRoutingModule } from './formulario-curso-routing.module';

import { FormularioCursoPage } from './formulario-curso.page';

import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioCursoPageRoutingModule
  ],
  declarations: [FormularioCursoPage]
})
export class FormularioCursoPageModule {}
