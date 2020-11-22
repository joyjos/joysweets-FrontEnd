import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comentario } from '../../models/comentarios.model';
import { ActivatedRoute, Router } from '@angular/router';

//Servicios
import { ComentarioService } from '../../services/comentario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styles: []
})
export class ComentarioComponent implements OnInit {

  form:FormGroup;

  //Creo un comentario de tipo Comentario vacío
  comentario:Comentario[]=[];

  constructor(public comentarioService:ComentarioService, public activatedRoute:ActivatedRoute, public router:Router) {

    //Obtengo el id que paso por la url
    activatedRoute.params.subscribe(params=>{
      let id=params['id'];

      //Cargo el comentario
      this.cargarComentario(id);

    });
   }

  ngOnInit(): void {

    //Validaciones
    this.form=new FormGroup({
      comentario:new FormControl(null, Validators.required),
      fechaComentario:new FormControl(null, Validators.required),
      idComentario:new FormControl
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
        this.form.controls['comentario'].setValue(resp.comentario);
        this.form.controls['fechaComentario'].setValue(resp.fechaComentario);
        this.form.controls['idComentario'].setValue(resp.idComentario);
      });
  }

  //=======================================
  //Método para actualizar un comentario
  //=======================================
  actualizarComentario(){

    //Creo el objeto de tipo Comentario
    let nuevoComentario=new Comentario(
      this.form.value.comentario,
      this.form.value.fechaComentario,
      this.form.value.idComentario
    );

    //console.log(nuevoComentario);
    
    this.comentarioService.actualizarComentario(nuevoComentario)
      .subscribe((resp:any)=>{
        //console.log(resp);
        //Actualizado el comentario, regreso a la página de comentarios
        this.router.navigate(['/admin/comentarios']);
      }, error=>{
        console.log(error.status);
        Swal.fire('Error al actualizar', error.error.mensaje, 'error');
      });
  }

}
