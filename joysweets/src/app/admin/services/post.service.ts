import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/posts.model';

//Configuración
import { URL_SERVICES } from '../../config/config';

//Sweetalert2
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http:HttpClient) { }

  //===============================
  //Método para cargar los posts
  //===============================
  cargarPosts(){
    let url=URL_SERVICES + '/posts/posts';
    return this.http.get(url);
  }

  //====================================
  //Método para cargar un post por id
  //====================================
  cargarPost(id:number){
    let url=URL_SERVICES + '/posts/post/' + id;
    return this.http.get(url);
  }

  //=============================
  //Método para borrar un post
  //=============================
  borrarPost(id:number){
    let url=URL_SERVICES + '/posts/eliminarPost/' + id;
    return this.http.delete(url, {responseType: 'text'});
  }

  //============================
  //Método para crear un post
  //============================
  crearPost(post:Post){
    let url=URL_SERVICES + '/posts/insertarPost';
    return this.http.post(url, post, {responseType: 'text'})
      .pipe(map((resp:any)=>{
        Swal.fire('Receta creada', post.nombre, 'success');
        return resp.post;
      }));
  }

  //=================================
  //Método para actualizar un post
  //=================================
  actualizarPost(id:number, post:Post){
    let url=URL_SERVICES + '/posts/modificarPost/' + id;
    return this.http.put(url, post)
      .pipe(map((resp:any)=>{
        Swal.fire('Receta actualizada', post.nombre, 'success');
        return resp.post;
      }))
  }

}
