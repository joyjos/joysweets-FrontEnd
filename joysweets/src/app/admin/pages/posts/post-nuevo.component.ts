import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { Router } from '@angular/router';

//CKEditor 5
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Servicios
import { PostService } from '../../services/post.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-nuevo',
  templateUrl: './post-nuevo.component.html',
  styles: ['./post-nuevo.component.css']
})
export class PostNuevoComponent implements OnInit {

  //Creo el editor
  public Editor=ClassicEditor;

  form:FormGroup;

  //Creo un post de tipo Post vacío
  post:Post[]=[];

  //Creo un archivo de tipo File
  file:File;

  constructor(public postService:PostService, public router:Router, public formbuilder:FormBuilder) {

    //Creo el formulario reactivo
    this.form = this.formbuilder.group({
      nombre: [''],
      categoria: [''],
      post: [''],
      imagen: ['']

    })
   }

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

  //Cuando selecciono un archivo creo el "file"
  uploadFile(event) {
    this.file = event.target.files[0];
    this.form.get('imagen').setValue(this.file)
  }

  registrarPost(){

    //Compruebo que mando la imagen
    if(!this.file){
      Swal.fire(
        'Error!',
        'Tienes que seleccionar una imagen',
        'error'
      )
    }

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
    formData.append("file", this.form.get('imagen').value);
    console.log(formData);

    //Llamo al servicio
    this.postService.crearPost(formData)
      .subscribe(resp=>{
        console.log(resp);
        //Creado el post, regreso a la página de posts
        this.router.navigate(['/admin/posts']);
        Swal.fire({
          title:'Receta creada',
          html:'<span style="color:#197AAA">'+pdto.nombre+'</span>',
          icon:'success'
        })
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
