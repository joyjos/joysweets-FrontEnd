import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Modelos
import { Comentario } from '../models/comentarios.model';

//Configuración
import { URL_SERVICES } from '../../config/config';

//Sweetalerts2
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(public http:HttpClient) { }

  //=====================================
  //Método para cargar los comentarios
  //=====================================
  cargarComentarios(){
    let url=URL_SERVICES + '/comentarios/comentarios';
    return this.http.get(url);
  }

  //==========================================
  //Método para cargar un comentario por id
  //==========================================
  cargarComentario(id:number){
    let url=URL_SERVICES + '/comentarios/comentario/' + id;
    return this.http.get(url);
  }

  //===================================
  //Método para borrar un comentario
  //===================================
  borrarComentario(id:number){
    let url=URL_SERVICES + '/comentarios/eliminarComentario/'+ id;
    return this.http.delete(url, {responseType: 'text'});
  }

  //=======================================
  //Método para crear un comentario
  //=======================================
  crearComentario(idPost:number, idUsuario:number, comentario:Comentario){
    let url=URL_SERVICES + '/comentarios/comentarios/'+ idPost +'/'+ idUsuario;
    return this.http.post(url, comentario, {responseType: 'text'});
  }

  //=======================================
  //Método para actualizar un comentario
  //=======================================
  actualizarComentario(comentario:Comentario){
    let url=URL_SERVICES + '/comentarios/modificarComentario/' + comentario.idComentario;
    return this.http.put(url, comentario, {responseType: 'text'})
      .pipe(map((resp:any)=>{
        Swal.fire('Comentario actualizado', 'Comentario actualizado con éxito', 'success');
        return resp.comentario;
      }));
  }
}
