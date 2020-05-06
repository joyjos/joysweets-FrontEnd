import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/NuevoUsuario';
import { LoginUsuario } from '../models/LoginUsuario';

import { Router } from '@angular/router';

//Configuración
import { URL_SERVICES } from '../../config/config';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';

//Servicios
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario:NuevoUsuario;

  constructor(private http:HttpClient, public tokenService:TokenService, public router:Router) {
    //Cargo el token en el Local Storage siempre que entro
    this.cargarStorage();
   }

  //Método para saber si estoy logueado
  estaLogueado(){
    if(this.tokenService.getToken()===null){
      return;
    }else{
      return (this.tokenService.getToken().length>5) ? true: false;
    }
  }

  //Inicializo el valor del token al recargar la página (si existe token obtengo su valor, si no lo pongo vacío)
  cargarStorage(){
    if(this.tokenService.getToken()){
      this.tokenService.getToken();
    }else{
      this.tokenService.setToken('');
    }
  }

  //Método para crear usuarios
  public nuevo(nuevoUsuario:NuevoUsuario){

    let url=URL_SERVICES + '/auth/nuevo';

    return this.http.post(url, nuevoUsuario, {responseType: 'text'})
      .pipe(map((resp:any)=>{
        Swal.fire('Usuario creado', nuevoUsuario.nombre, 'success');
        return resp.usuario;
      }));
  }

  //Método para el login
  public login(loginUsuario:LoginUsuario, recuerdame:boolean=false){

    let url=URL_SERVICES + '/auth/login';

    //Si marco recuérdame, guardo en Local Storage el username
    if(recuerdame){
      localStorage.setItem('username', loginUsuario.username);
    }else{
      localStorage.removeItem('username');
    }
    
    return this.http.post(url, loginUsuario);
  }

  //Método para el logout
  public logout(){
    //Elimino los datos en el Local Storage
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('AuthUserName');
    localStorage.removeItem('AuthAuthorities');

    this.router.navigate(['/login']);
  }
}
