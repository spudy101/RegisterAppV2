import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAlumnoPage } from './formulario-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioAlumnoPageRoutingModule {}
