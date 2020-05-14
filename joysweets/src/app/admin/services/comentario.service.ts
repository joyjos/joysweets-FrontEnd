import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Configuración
import { URL_SERVICES } from '../../config/config';

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
}
