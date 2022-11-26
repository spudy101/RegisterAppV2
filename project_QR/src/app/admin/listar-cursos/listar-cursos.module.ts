import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCursosPageRoutingModule } from './listar-cursos-routing.module';

import { ListarCursosPage } from './listar-cursos.page';

import { LibreriasModule } from 'src/app/librerias/librerias.module';

@NgModule({
  imports: [
    LibreriasModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCursosPageRoutingModule
  ],
  declarations: [ListarCursosPage]
})
export class ListarCursosPageModule {}
