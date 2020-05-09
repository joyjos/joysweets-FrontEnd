import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

//Configuración
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;

  constructor(public http:HttpClient) {
    
   }

   //Método para cargar los usuarios
   cargarUsuarios(){
    let url=URL_SERVICES + "/usuarios/usuarios";
    return this.http.get(url);
  }

  //Método para cargar un usuario
  cargarUsuario(id:number){
    let url=URL_SERVICES + `/usuarios/usuario/${id}`;
  }

  //Método para borrar un usuario
  borrarUsuario(id:number){
    let url=URL_SERVICES + '/usuarios/eliminarUsuario/'+ id;
    return this.http.delete(url, {responseType: 'text'});
  }

}
