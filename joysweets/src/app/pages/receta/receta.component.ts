import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  //Creo una receta de tipo Post
  receta:Post;
  id:Int16Array;

  constructor(private activatedRoute:ActivatedRoute, public postsService:PostsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(parametros=>{
        this.postsService.getReceta(parametros['id'])
          .subscribe((receta:Post)=>{
            this.id=parametros['id'];
            this.receta=receta;
          });
      });
  }

}
