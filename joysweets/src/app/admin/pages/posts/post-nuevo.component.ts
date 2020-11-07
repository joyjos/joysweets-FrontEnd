import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { Router } from '@angular/router';

//CKEditor 5
import * as Editor from '@ckeditor/build/ckeditor';

//Servicios
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-nuevo',
  templateUrl: './post-nuevo.component.html',
  styles: ['./post-nuevo.component.css']
})
export class PostNuevoComponent implements OnInit {

  //Creo el editor
  public Editor=Editor;

  form:FormGroup;

  post:Post[]=[];

  constructor(public postService:PostService, public router:Router) { }

  ngOnInit(): void {
    
    //Validaciones
    this.form=new FormGroup({
      nombre:new FormControl(this.post, Validators.required),
      categoria:new FormControl(null, Validators.required),
      post:new FormControl(null, Validators.required),
      imagen:new FormControl(null, Validators.required),
    });
  }

  //==============================
  //Método para guardar un post
  //==============================
  registrarPost(){

    //Compruebo que el formulario es válido
    if(this.form.invalid){
      return;
    }

    console.log('Forma válida', this.form.valid);
    console.log(this.form.value);

    //Creo un objeto de tipo Post
    let nuevoPost=new Post(
      this.form.value.nombre,
      this.form.value.categoria,
      this.form.value.post,
      this.form.value.imagen
    );

    //Llamo al servicio
    this.postService.crearPost(nuevoPost)
      .subscribe(resp=>{
        //console.log(resp);
        //Creado el post, regreso a la página de posts
        this.router.navigate(['/admin/posts']);
      });
  }

  //====================================
  //Método para cargar un post por id
  //====================================
  cargarPost(id:number){
    this.postService.cargarPost(id)
      .subscribe((resp:any)=>{
        console.log(resp);
        this.post=resp;
      })
  }

}
