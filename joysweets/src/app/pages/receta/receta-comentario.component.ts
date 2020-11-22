import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/admin/models/usuarios.model';
import { ComentarioService } from 'src/app/admin/services/comentario.service';
import { UsuarioService } from 'src/app/admin/services/usuario.service';
import { Comentario } from 'src/app/interfaces/comentario.interface';
import { Receta } from 'src/app/interfaces/receta.interface';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta-comentario',
  templateUrl: './receta-comentario.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComentarioComponent implements OnInit {

  form:FormGroup;

  //Creo una receta de tipo Receta
  receta:Receta;

  //Creo un comentario de tipo Comentario
  comentario:Comentario;
  //Creo un array de comentarios de tipo Comentario vacío, donde voy a guardar los datos que traigo de MySQL Workbench
  comentarios:Comentario;

  //Creo un usuario de tipo Usuario
  usuario:Usuario;

  pruebas:Comentario;
  textos:Comentario;

  id:number;

  constructor(private activatedRoute:ActivatedRoute, public postsService:PostsService, public comentarioService:ComentarioService,
    public usuarioService:UsuarioService, public router:Router) { 

      //Cargo el username del LocalStorage
      let username=localStorage.getItem('AuthUserName');

      //Cargo el usuario por username
      this.cargarUsuarioU(username);
    }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params=>{
        console.log(params['id']);
        this.postsService.getReceta(params['id'])
          .subscribe((receta:Receta)=>{
            //console.log(receta);
            this.id=params['id'];
            this.receta=receta;

        //Guardo en Local Storage la receta donde voy a dejar el comentario
        localStorage.setItem('urlComentario', params['id']);
          });
      });

    //Validaciones
    this.form=new FormGroup({
      comentario:new FormControl(this.comentario, Validators.required)
    })

      this.getComentarios();
  }

  //============================================================
  //Método para cargar los comentarios (filtrados por idPost)
  //============================================================
  getComentarios(){
    this.postsService.getComentarios()
    .subscribe((result:any)=>{
      //console.log(result);
      let data=result.filter((comentario:Comentario)=>comentario.post.idPost==this.id);
      //console.log(data);
      this.comentarios=data;
    });

  }

  //=============================================
  //Método para cargar un usuario por username
  //=============================================
  cargarUsuarioU(username:string){
    this.usuarioService.cargarUsuarioU(username)
      .subscribe((resp:any)=>{
        //console.log(resp);

        this.usuario=resp;
      });
  }

  //=======================================
  //Método para crear un comentario
  //=======================================
  crearComentario(){

    //Cargo el urlComentario del Local Storage
    let idPost=parseInt(localStorage.getItem('urlComentario'));
    console.log(idPost);

    //Cargo el username del LocalStorage
    let username=localStorage.getItem('AuthUserName');

    //Cargo el usuario por el username
    let idUsuario=this.usuario.idUsuario;

    let nuevoComentario={
      'comentario':this.form.value.comentario
    }
    //console.log(nuevoComentario);

    this.comentarioService.crearComentario(idPost, idUsuario, nuevoComentario)
      .subscribe(resp=>{
        //Creado el comentario, hago logout
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('AuthUserName');
        localStorage.removeItem('AuthAuthorities');
        localStorage.removeItem('username');
        localStorage.removeItem('urlComentario');
        //Creado el comentario, regreso a la página de la receta
        this.router.navigate(['/receta/'+idPost]);
        localStorage.removeItem('urlComentario');
        Swal.fire({
          title:'Comentario creado',
          html:'Comentario creado con éxito',
          icon:'success'
        })
      });
    
  }

  

}
