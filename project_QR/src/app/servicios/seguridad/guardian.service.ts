import { Injectable } from '@angular/core';
/**
 * libreria
 */
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authServ: AuthService
  ) { }

  canActivate():boolean{
    return this.authServ.isAuthenticated();
  }
}