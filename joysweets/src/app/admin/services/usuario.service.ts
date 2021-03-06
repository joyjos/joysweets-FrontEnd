import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Modelos
import { Usuario } from '../models/usuarios.model';

//Configuración
import { URL_SERVICES } from '../../config/config';

//Sweetalert2
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;

  constructor(public http:HttpClient) {
    
   }

   //==================================
   //Método para cargar el rol de un usuario
   //==================================
   getRoleName():string{
    console.log(this.usuario.roleName);
     return this.usuario.roleName;
     
   }

   //==================================
   //Método para cargar los usuarios
   //==================================
   cargarUsuarios(){
    let url=URL_SERVICES + '/usuarios/usuarios';
    return this.http.get(url);
  }

  //================================
  //Método para cargar un usuario
  //================================
  cargarUsuario(id:number){
    let url=URL_SERVICES + '/usuarios/usuario/'+ id;
    return this.http.get(url);
  }

  //=============================================
  //Método para cargar un usuario por username
  //=============================================
  cargarUsuarioU(username:string){
    let url=URL_SERVICES + '/usuarios/usuarioU/'+ username;
    return this.http.get(url);
  }

  //================================
  //Método para borrar un usuario
  //================================
  borrarUsuario(id:number){
    let url=URL_SERVICES + '/usuarios/eliminarUsuario/'+ id;
    return this.http.delete(url, {responseType: 'text'});
  }

  //====================================
  //Método para actualizar un usuario
  //====================================
  actualizarUsuario(usuario:Usuario){
    let url=URL_SERVICES + '/usuarios/modificarUsuario/' + usuario.idUsuario;
    return this.http.put(url, usuario, {responseType: 'text'})
      .pipe(map((resp:any)=>{
        Swal.fire('Usuario actualizado', '<span style="color:#197AAA">'+usuario.nombre+'</span>', 'success');
        return resp.usuario;
    }));
  }

}
