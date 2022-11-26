import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarProfesoresPage } from './listar-profesores.page';

const routes: Routes = [
  {
    path: '',
    component: ListarProfesoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarProfesoresPageRoutingModule {}
