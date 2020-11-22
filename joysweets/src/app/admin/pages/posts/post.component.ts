import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { ActivatedRoute, Router } from '@angular/router';

//CKEditor 5
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Servicios
import { PostService } from '../../services/post.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {

  //Creo el editor
  public Editor=ClassicEditor;

  form:FormGroup;

  //Creo un post de tipo Post vacío
  post:Post;

  //Creo un archivo de tipo File
  file:File;

  constructor(public postService:PostService, public activatedRoute:ActivatedRoute, public router:Router) { 

    activatedRoute.params.subscribe(params=>{
      let id=params['id'];

      //Cargo el post
      this.cargarPost(id);
      
    });
  }

  ngOnInit(): void {

    //Validaciones
    this.form=new FormGroup({
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
        //console.log(resp);
        this.post=resp;

        //Establezco los valores de los campos
        this.form.controls['nombre'].setValue(resp.nombre);
        this.form.controls['categoria'].setValue(resp.categoria);
        this.form.controls['post'].setValue(resp.post);
        this.form.controls['imagen'].setValue(resp.imagen);
      });
  }

  //=================================
  //Método para actualizar un post
  //=================================

  //Cuando selecciono un archivo creo el "file"
  uploadFile(event) {
    this.file = event.target.files[0];
    this.form.get('imagen').setValue(this.file);
  }
  
  actualizarPost(){

    //Si actualizo la foto
    if(this.file!=null){

      //Creo el "pdto"
      const pdto={
        "nombre":this.form.get('nombre').value,
        "categoria":this.form.get('categoria').value,
        "post":this.form.get('post').value
      }

      //console.log(pdto);

      //El Content-Type tiene que ser application/json
      const json = JSON.stringify(pdto);
      const blob = new Blob([json], {
        type: 'application/json'
      });

      //Creo el formData que voy a mandar agregando los campos con sus valores 
      let formData=new FormData();
      formData.append("pdto",blob);
      formData.append("file", this.form.get('imagen').value);
      //console.log(formData);

      //Llamo al servicio
      this.postService.actualizarPost(this.post.idPost, formData)
        .subscribe(resp=>{
          //console.log(resp);
          //Modificado el post, regreso a la página de posts
          this.router.navigate(['/admin/posts']);
          Swal.fire({
            title:'Receta actualizada',
            html:'<span style="color:#197AAA">'+pdto.nombre+'</span>',
            icon:'success'
          })
        });
    }else{ //Si no actualizo la foto
      
      //Creo el "pdto"
      const pdto={
        "nombre":this.form.get('nombre').value,
        "categoria":this.form.get('categoria').value,
        "post":this.form.get('post').value
      }

      //El Content-Type tiene que ser application/json
      const json = JSON.stringify(pdto);
      const blob = new Blob([json], {
        type: 'application/json'
      });

      //Creo el formData que voy a mandar agregando los campos con sus valores 
      let formData=new FormData();
      formData.append("pdto",blob);
      //console.log(formData);

      //Llamo al servicio
      this.postService.actualizarPostNoFile(this.post.idPost, formData)
        .subscribe(resp=>{
          //console.log(resp);
          //Modificado el post, regreso a la página de posts
          this.router.navigate(['/admin/posts']);
          Swal.fire({
            title:'Receta actualizada',
            html:'<span style="color:#197AAA">'+pdto.nombre+'</span>',
            icon:'success'
          })
        });
    }
  }

}
