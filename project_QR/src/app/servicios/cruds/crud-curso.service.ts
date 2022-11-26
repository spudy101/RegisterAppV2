import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { cursoI } from 'src/app/modelos/models'; 

@Injectable({
  providedIn: 'root'
})
export class CrudCursoService {

  constructor(private firestore: AngularFirestore) { }

  curso: cursoI;

  createid(){
    return this.firestore.createId();
  }

  agregarECurso<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getCursos(): Observable<any> {
    return this.firestore.collection('cursos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarCurso(id: string): Promise<any> {
    return this.firestore.collection('cursos').doc(id).delete();
  }

  getCurso(id: string): Observable<any> {
    return this.firestore.collection('cursos').doc(id).valueChanges();
  }

  actualizarCurso(id: string, data:any): Promise<any> {
    return this.firestore.collection('cursos').doc(id).update(data);
  }
}
