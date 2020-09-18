import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Receta } from '../../interfaces/receta.interface';
import { Comentario } from '../../interfaces/comentario.interface';
import { map, filter } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';

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

  pruebas:Comentario;
  textos:Comentario;

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
        /* this.postsService.getComentariosidPost(this.id)
         .subscribe((comentario:Comentario)=>{
           console.log(comentario);
           this.comentarios=comentario;
         })  */ 
      });

       /* this.postsService.getComentariosidPost(2)
         .subscribe((comentario:Comentario)=>{
           console.log(comentario);
           this.comentarios=comentario;
        }); */

     /* this.postsService.getComentariosidPost(2)
      .subscribe(resp=>console.log(resp)); */
      


      //this.postsService.getComentarios()
      //.pipe(filter((comentario:Comentario)=>comentario.idPost===1));

      this.getComentarios();
      this.getWords();
      this.getComentariosP();
      this.getComentariosPP();

  }

  getComentarios(){
    this.postsService.getComentarios()
    .pipe(filter((item:Comentario)=>item.comentario=='Espectacular'))
    .subscribe((item:any)=>{
      console.log(item);
      this.pruebas=item;
    });
    
  }

  getComentariosP(){
    this.postsService.getComentarios().pipe(filter((comentario:Comentario)=>comentario.comentario=='Espectaculares'))
    .subscribe(resp=>{
      console.log(resp);
    })
    
  }

  getComentariosPP(){
    this.postsService.getComentarios()
    .subscribe((result:any)=>{
      console.log(result);
      let data=result.filter((comentario:Comentario)=>comentario.idPost===2);
      console.log(data);
    });

  }

   words = [
     {id: 1, text: 'spray'},
     {id: 2, text: 'limit'},
     {id: 3, text: 'elite'},
     {id: 4, text: 'exuberant'},
     {id: 5, text: 'destruction'},
     {id: 6, text: 'present'},
    ];

  getWords(){
    const result = this.words.filter(word => word.id==2);
    console.log(result);
}

}
