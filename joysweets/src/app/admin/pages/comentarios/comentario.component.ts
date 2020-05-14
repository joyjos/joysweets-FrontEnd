import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comentario } from '../../models/comentarios.model';
import { ActivatedRoute } from '@angular/router';

//Servicios
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styles: []
})
export class ComentarioComponent implements OnInit {

  forma:FormGroup;

  //Creo un comentario de tipo Comentario vacío
  comentario:Comentario[]=[];

  constructor(public comentarioService:ComentarioService, public activatedRoute:ActivatedRoute) {

    activatedRoute.params.subscribe(params=>{
      let id=params['id'];

      //Cargo el comentario
      this.cargarComentario(id);

    });
   }

  ngOnInit(): void {

    //Validaciones
    this.forma=new FormGroup({
      comentario:new FormControl(null, Validators.required),
      fechaComentario:new FormControl(null, Validators.required)
    });
  }

  //==========================================
  //Método para cargar un comentario por id
  //==========================================
  cargarComentario(id:number){
    this.comentarioService.cargarComentario(id)
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.comentario=resp;

        //Establezco los valores de los campos
        this.forma.controls['comentario'].setValue(resp.comentario);
        this.forma.controls['fechaComentario'].setValue(resp.fechaComentario);
      });
  }

}
