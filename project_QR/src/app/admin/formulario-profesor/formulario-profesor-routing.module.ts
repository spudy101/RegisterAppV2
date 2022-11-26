import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioProfesorPage } from './formulario-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioProfesorPageRoutingModule {}
