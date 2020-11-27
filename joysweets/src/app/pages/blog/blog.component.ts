import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  //Variable para la paginación
  page:number;

  constructor(public postsService:PostsService) { }

  ngOnInit(): void {
  }

}
