import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo:string;

  constructor(private route:Router, private meta:Meta) {

      this.getDataRoute()
      .subscribe(data=>{
        //console.log(data);
        this.titulo=data.titulo;

        //Defino la MetaTag
        const metaTag:MetaDefinition={
          name: 'description',
          content: this.titulo
        };

        //Lo paso al HTML
        this.meta.updateTag(metaTag);
      });

  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.route.events.pipe(
      filter(evento=>evento instanceof ActivationEnd),
      filter((evento:ActivationEnd)=>evento.snapshot.firstChild===null),
      map((evento:ActivationEnd)=>evento.snapshot.data)
    )
  }

}
