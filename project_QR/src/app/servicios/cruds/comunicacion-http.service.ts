import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionHttpService {

  httpOptions={
    headers: new HttpHeaders(
      {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    )
  }

  constructor(private http: HttpClient) { }
  
  direccion_mindicador='https://mindicador.cl/api/dolar';
  direccion_jsonplaceholder='https://jsonplaceholder.typicode.com/posts';
  
  direccion_django = 'http://127.0.0.1:8000/api/usuarios/';

  getPersonasDjango():Observable<any>{
    return this.http.get(this.direccion_django).pipe(retry(3));
  }

  getPersonaDjango(id):Observable<any>{
    return this.http.get(this.direccion_django+"/"+id).pipe(retry(3));
  }

  getDolar():Observable<any>{
    return this.http.get(this.direccion_mindicador).pipe(retry(3));
  }

  // crear los metodos de acceso a json placeholder

  // metodo de grabar
  createPost(post):Observable<any>{
    return this.http.post(this.direccion_jsonplaceholder,post,this.httpOptions).pipe(retry(3));
  }
  // metodo recuperar todo
  getPosts():Observable<any>{
    return this.http.get(this.direccion_jsonplaceholder).pipe(retry(3));
  }
  // metodo recuperar solo un reg por ID (id)
  getPost(id):Observable<any>{
    return this.http.get(this.direccion_jsonplaceholder+"/"+id).pipe(retry(3));
  }
  // metodo eliminar
  deletePost(id):Observable<any>{
    return this.http.delete(this.direccion_jsonplaceholder+"/"+id,this.httpOptions)
    .pipe(retry(3));
  }
  // modificar
  updatePost(id,newPost):Observable<any>{
    return this.http.put(this.direccion_jsonplaceholder+"/"+id,newPost,this.httpOptions)
    .pipe(retry(3));
  }
}
