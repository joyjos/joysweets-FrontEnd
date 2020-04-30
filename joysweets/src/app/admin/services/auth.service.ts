import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/NuevoUsuario';
import { LoginUsuario } from '../models/LoginUsuario';

import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8081/auth/';

  constructor(private http:HttpClient) { }

  public nuevo(nuevoUsuario:NuevoUsuario){
    return this.http.post(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario, recuerdame:boolean=false){

    let url=URL_SERVICES + '/auth/login';

    //Si marco recuérdame guardo en Local Storage el username
    if(recuerdame){
      localStorage.setItem('username', loginUsuario.username);
    }else{
      localStorage.removeItem('username');
    }
    
    return this.http.post(url, loginUsuario);
  }
}
