import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Configuración
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http:HttpClient) { }

  //Método para cargar los posts
  cargarPosts(){
    let url=URL_SERVICES + "/posts/posts";
    return this.http.get(url);
  }

  //Método para borrar un post
  borrarPost(id:number){
    let url=URL_SERVICES + '/posts/eliminarPost/' + id;
    return this.http.delete(url, {responseType: 'text'});
  }
}
