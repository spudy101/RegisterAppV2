import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { listaI } from 'src/app/modelos/models'; 

@Injectable({
  providedIn: 'root'
})
export class CrudListaService {

  constructor(private firestore: AngularFirestore) { }

  createid(){
    return this.firestore.createId();
  }

  agregarLista<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }

  getListas(): Observable<any> {
    return this.firestore.collection('listas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarLista(id: string): Promise<any> {
    return this.firestore.collection('listas').doc(id).delete();
  }

  getLista(id: string): Observable<any> {
    return this.firestore.collection('listas').doc(id).valueChanges();
  }

  actualizarLista(id: string, data:any): Promise<any> {
    return this.firestore.collection('cursos').doc(id).update(data);
  }
}
