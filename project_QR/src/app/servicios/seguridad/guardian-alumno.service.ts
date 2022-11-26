import { Injectable } from '@angular/core';

import { AuthAlumnoService } from './auth-alumno.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianAlumnoService {

  constructor(
    private authServ: AuthAlumnoService
  ) { }

  canActivate():boolean{
    return this.authServ.isAuthenticated();
  }
}
