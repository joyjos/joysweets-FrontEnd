import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.model';

//Servicios
import { PostService } from '../../services/post.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []
})
export class PostsComponent implements OnInit {

    //Creo el array posts (inicializo vacío)
    posts:Post[]=[];

    //Creo el filtro vacío
    filterpost='';

  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.cargarPosts();
  }

  //===============================
  //Método para cargar los posts
  //===============================
  cargarPosts(){
    this.postService.cargarPosts()
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.posts=resp;
      })
  }

  //=============================
  //Método para borrar un post
  //=============================
  borrarPost(post:Post){
    
    //console.log(post);

    Swal.fire({
      title: 'Estás seguro?',
      html: 'Estás a punto de borrar <br><span style="color:#197AAA">'+post.nombre+'</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancela!'
    }).then((borrar) => {

      //console.log(borrar);

      if (borrar.value) {
        this.postService.borrarPost(post.idPost)
          .subscribe(resp=>{
            //console.log(resp);
             this.cargarPosts();
          });
        Swal.fire(
          'Borrado!',
          post.nombre+ ' ha sido borrado',
          'success'
        )
      }
    });
  }

}
