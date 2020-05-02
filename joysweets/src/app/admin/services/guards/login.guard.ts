import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//Servicios
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

constructor(public auth:AuthService, public router:Router){}

  canActivate() {
    if(this.auth.estaLogueado()){
      console.log('Pasó el Guard');
      return true;
    }else{
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
    //console.log('Pasó por el Login Guard');
  }
  
}
