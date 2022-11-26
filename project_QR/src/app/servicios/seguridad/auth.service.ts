import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { profesorI } from 'src/app/modelos/models'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AngularFireAuth: AngularFireAuth) { }

  authState = new BehaviorSubject(false);

  login(correo: string, contrasena: string) {
    this.authState = new BehaviorSubject(true);
    return this.AngularFireAuth.signInWithEmailAndPassword(correo, contrasena)
  }

  salir(){
    this.AngularFireAuth.signOut();
    this.authState=new BehaviorSubject(false)
  }

  registrarUser(datos: profesorI) {
    return this.AngularFireAuth.createUserWithEmailAndPassword(datos.correo, datos.contrasena);
  }

  stateUser() {
    return this.AngularFireAuth.authState
  }

  isAuthenticated() {
    return this.authState.value;
  }

  async getid() {
    const user = await this.AngularFireAuth.currentUser;
    return user.uid
  }

}
