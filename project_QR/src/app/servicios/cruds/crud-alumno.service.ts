import { Injectable } from '@angular/core';

import { alumnoI } from 'src/app/modelos/models'; 
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudAlumnoService {

  constructor(private firestore: AngularFirestore) { }

  createid(){
    return this.firestore.createId();
  }

  agregarAlumno<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getAlumnos(): Observable<any> {
    return this.firestore.collection('alumnos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarAlumno(id: string): Promise<any> {
    return this.firestore.collection('alumnos').doc(id).delete();
  }

  getAlumno(id: string): Observable<any> {
    return this.firestore.collection('alumnos').doc(id).valueChanges();
  }

  actualizarAlumno(id: string, data:any): Promise<any> {
    return this.firestore.collection('alumnos').doc(id).update(data);
  }
}
