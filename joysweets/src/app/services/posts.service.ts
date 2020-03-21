import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //Creo un array de posts de tipo Post vacío, donde voy a guardar los datos que traigo de MySQL Workbench
  posts:Post[]=[];

  constructor(private http:HttpClient) {
    this.cargarPosts();
   }

  //Método para cargar los posts
  private cargarPosts(){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:8081/posts/')
      .subscribe((resp:Post[])=>{

        //Guardo en posts la respuesta
        this.posts=resp;

        resolve();
      });
    });
  }

  //Método para cargar la receta
  public getReceta(id:Int16Array){
    return this.http.get('http://localhost:8081/posts/{id}');
  }

}
