import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, filter} from 'rxjs/operators';

//Interfaces
import { Post } from '../interfaces/post.interface';
import { Comentario } from '../interfaces/comentario.interface';
import { Receta } from '../interfaces/receta.interface';

//Configuración
import { URL_SERVICES } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //Creo un array de posts de tipo Post vacío, donde voy a guardar los datos que traigo de MySQL Workbench
  posts:Post;

  comentario:Comentario;

  constructor(private http:HttpClient) {
    this.cargarPosts();
   }

  //===============================
  //Método para cargar los posts
  //===============================
  private cargarPosts(){
    return new Promise((resolve, reject)=>{
      let url=URL_SERVICES + '/posts/posts';
      this.http.get(url)
      .subscribe((resp:Post)=>{

        //Guardo en posts la respuesta
        this.posts=resp;

        resolve();
      });
    });
  }

  //===============================
  //Método para cargar la receta
  //===============================
  public getReceta(id:number){
    let url=URL_SERVICES + '/posts/post/'+ id;
    return this.http.get(url);
  }

  //=====================================
  //Método para cargar los comentarios
  //=====================================
  public getComentarios(){
    let url=URL_SERVICES + '/comentarios/comentarios';
    return this.http.get(url);
  }

  //=====================================
  //Método para filtrar los comentarios
  //=====================================
  public getComentariosidPost(){
    let comentarios=this.getComentarios();
    let comentario=comentarios.pipe(filter((item:Comentario)=>item.comentario==='Espectacular'));
    return comentario;
  }

  

}
