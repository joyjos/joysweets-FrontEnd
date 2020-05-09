import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';
import {map, filter} from 'rxjs/operators';
import { Comentario } from '../interfaces/comentario.interface';
import { Receta } from '../interfaces/receta.interface';

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
      this.http.get('http://localhost:8081/posts/posts')
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
    return this.http.get(`http://localhost:8081/posts/post/${id}`);
  }

  //=====================================
  //Método para cargar los comentarios
  //=====================================
  public getComentarios(){
    return this.http.get(`http://localhost:8081/comentarios/comentarios`);
  }

}
