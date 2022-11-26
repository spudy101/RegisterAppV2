import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicios/seguridad/guardian.service'; 
import { GuardianAlumnoService } from './servicios/seguridad/guardian-alumno.service'; 


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./Alumno/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./Alumno/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./Alumno/horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./Alumno/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./Alumno/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./Alumno/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },


  {
    path: 'cursos',
    loadChildren: () => import('./Profesor/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./Profesor/generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
  },
  {
    path: 'ayuda2',
    loadChildren: () => import('./Profesor/ayuda2/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'seguridad2',
    loadChildren: () => import('./Profesor/seguridad2/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'listas/:id',
    loadChildren: () => import('./Profesor/listas/listas.module').then( m => m.ListasPageModule)
  },
  {
    path: 'alumnos2/:id',
    loadChildren: () => import('./Profesor/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },


  {
    path: 'formulario-curso',
    loadChildren: () => import('./admin/formulario-curso/formulario-curso.module').then( m => m.FormularioCursoPageModule)
  },
  {
    path: 'formulario-profesor',
    loadChildren: () => import('./admin/formulario-profesor/formulario-profesor.module').then( m => m.FormularioProfesorPageModule)
  },
  {
    path: 'editar-curso/:id',
    loadChildren: () => import('./admin/formulario-curso/formulario-curso.module').then( m => m.FormularioCursoPageModule)
  },

  {
    path: 'editar-profesor/:id',
    loadChildren: () => import('./admin/formulario-profesor/formulario-profesor.module').then( m => m.FormularioProfesorPageModule)
  },
  {
    path: 'formulario-alumno',
    loadChildren: () => import('./admin/formulario-alumno/formulario-alumno.module').then( m => m.FormularioAlumnoPageModule)
  },
  {
    path: 'editar-alumno/:id',
    loadChildren: () => import('./admin/formulario-alumno/formulario-alumno.module').then( m => m.FormularioAlumnoPageModule)
  },
  {
    path: 'listar-profesores',
    loadChildren: () => import('./admin/listar-profesores/listar-profesores.module').then( m => m.ListarProfesoresPageModule)
  },
  {
    path: 'listar-cursos',
    loadChildren: () => import('./admin/listar-cursos/listar-cursos.module').then( m => m.ListarCursosPageModule)
  },
  {
    path: 'listar-alumnos',
    loadChildren: () => import('./admin/listar-alumnos/listar-alumnos.module').then( m => m.ListarAlumnosPageModule)
  },


  {
    path: 'login',
    loadChildren: () => import('./Alumno/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-p',
    loadChildren: () => import('./Profesor/login-p/login-p.module').then( m => m.LoginPPageModule)
  },
  {
    path: 'login-a',
    loadChildren: () => import('./admin/login-a/login-a.module').then( m => m.LoginAPageModule)
  },


  {
    path: '**',
    loadChildren: () => import('./p404/p404.module').then( m => m.P404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
