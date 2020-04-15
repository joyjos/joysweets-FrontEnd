import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Receta } from '../../interfaces/receta.interface';
import { Comentario } from '../../interfaces/comentario.interface';
import { take, first } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  //Creo una receta de tipo Receta
  receta:Receta;

  //Creo un comentario de tipo Comentario
  comentario:Comentario;
  //Creo un array de comentarios de tipo Comentario vacío, donde voy a guardar los datos que traigo de MySQL Workbench
  comentarios:Comentario;

  id:number;

  constructor(private activatedRoute:ActivatedRoute, public postsService:PostsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params=>{
        console.log(params['id']);
        this.postsService.getReceta(params['id'])
          .subscribe((receta:Receta)=>{
            console.log(receta);
            this.id=params['id'];
            this.receta=receta;
            this.postsService.getComentarios()
              .subscribe((resp:Comentario)=>{
                console.log(resp);
                this.comentarios=resp;
              });
          });
      });

      // this.postsService.getComentarios(this.id)
      //   .subscribe((comentario:Comentario)=>{
      //     console.log(comentario);
      //     this.comentarios=comentario;
      //   });
      
  }

}
