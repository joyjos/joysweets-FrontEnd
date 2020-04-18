import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

//Configuración
import { URL_SERVICES } from '../../config/config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) {
    //console.log('Servicio de usuario listo');
   }

   //Método para el login
   login(usuario:Usuario){
    let url=URL_SERVICES+ "/usuario"
   }

   //Método para crear usuarios
   crearUsuario(usuario:Usuario){
    let url=URL_SERVICES + "/insertarUsuario";
    return this.http.post(url, usuario, {responseType: 'text'})
      .pipe(map((resp:any)=>{
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
   }
}
