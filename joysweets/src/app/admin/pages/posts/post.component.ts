import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { ActivatedRoute, Router } from '@angular/router';

//CKEditor 5
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Servicios
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {

  //Creo el editor
  public Editor=ClassicEditor;

  forma:FormGroup;

  //Creo un post de tipo Post vacío
  post:Post[]=[];

  constructor(public postService:PostService, public activatedRoute:ActivatedRoute, public router:Router) { 

    activatedRoute.params.subscribe(params=>{
      let id=params['id'];

      //Cargo el post
      this.cargarPost(id);
      
    });
  }

  ngOnInit(): void {

    //Validaciones
    this.forma=new FormGroup({
      nombre:new FormControl(null, Validators.required),
      categoria:new FormControl(null, Validators.required),
      post:new FormControl(null, Validators.required),
      imagen:new FormControl(null, Validators.required),
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

        //Establezco los valores de los campos
        this.forma.controls['nombre'].setValue(resp.nombre);
        this.forma.controls['categoria'].setValue(resp.categoria);
        this.forma.controls['post'].setValue(resp.post);
        this.forma.controls['imagen'].setValue(resp.imagen);
      });
  }

  //=================================
  //Método para actualizar un post
  //=================================
  actualizarPost(id:number, post:Post){
    this.postService.actualizarPost(id, post)
      .subscribe(resp=>{
        console.log(resp);
      })
  }

}
