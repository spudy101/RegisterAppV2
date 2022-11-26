import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarProfesoresPageRoutingModule } from './listar-profesores-routing.module';

import { ListarProfesoresPage } from './listar-profesores.page';

import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListarProfesoresPageRoutingModule
  ],
  declarations: [ListarProfesoresPage]
})
export class ListarProfesoresPageModule {}
