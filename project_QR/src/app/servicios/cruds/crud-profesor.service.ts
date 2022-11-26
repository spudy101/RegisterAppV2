import { Injectable } from '@angular/core';
/**
 * librerias
 */
 import { AngularFirestore} from '@angular/fire/compat/firestore';
 import { Observable } from 'rxjs';
import { profesorI } from 'src/app/modelos/models';
 

@Injectable({
  providedIn: 'root'
})
export class CrudProfesorService {

  constructor(private firestore: AngularFirestore) { }

  createid(){
    return this.firestore.createId();
  }

  agregarProfesor<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getProfesores(): Observable<any> {
    return this.firestore.collection('profesores', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarProfesor(id: string): Promise<any> {
    return this.firestore.collection('profesores').doc(id).delete();
  }

  getProfesor(id: string): Observable<any> {
    return this.firestore.collection('profesores').doc(id).valueChanges();
  }

  actualizarProfesor(id: string, data:profesorI): Promise<any> {
    return this.firestore.collection('profesores').doc(id).update(data);
  }
}
