import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../models/comentarios.model';


//Servicios
import { ComentarioService } from '../../services/comentario.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styles: []
})
export class ComentariosComponent implements OnInit {

  //Creo el array comentarios
  comentarios:Comentario[]=[];

  //Creo el filtro vacío
  filtercomment='';

  constructor(public comentarioService:ComentarioService) { }

  ngOnInit(): void {
    this.cargarComentarios();
  }

  //=====================================
  //Método para cargar los comentarios
  //=====================================
  cargarComentarios(){
    this.comentarioService.cargarComentarios()
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.comentarios=resp;
      })
  }

  //===================================
  //Método para borrar un comentario
  //===================================
  borrarComentario(comentario:Comentario){

    //console.log(comentario);

    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estás a punto de borrar a ' +comentario.comentario,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancela!'
    }).then((borrar) => {

      //console.log(borrar);

      if (borrar.value) {
        this.comentarioService.borrarComentario(comentario.idComentario)
          .subscribe(resp=>{
            //console.log(resp);
             this.cargarComentarios();
          });
        Swal.fire(
          'Borrado!',
          comentario.comentario+ ' ha sido borrado',
          'success'
        )
      }
    });
  }

}
