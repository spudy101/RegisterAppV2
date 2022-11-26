import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioCursoPage } from './formulario-curso.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioCursoPageRoutingModule {}
