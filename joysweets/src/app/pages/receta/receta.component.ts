import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Receta } from '../../interfaces/receta.interface';
import { Comentario } from '../../interfaces/comentario.interface';
import { map, filter } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../admin/models/usuarios.model';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

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

  constructor(private activatedRoute:ActivatedRoute, public postsService:PostsService) {

    
   }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params=>{
        //console.log(params['id']);
        this.postsService.getReceta(params['id'])
          .subscribe((receta:Receta)=>{
            //console.log(receta);
            this.id=params['id'];
            this.receta=receta;
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

}
