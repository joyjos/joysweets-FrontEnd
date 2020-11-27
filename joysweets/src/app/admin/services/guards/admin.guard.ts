import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';

//Modelos
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { UsuarioService } from '../usuario.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  usuario:Usuario;
  roleName:string;

  constructor(private usuarioService:UsuarioService, private tokenService:TokenService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      //Cargo el username
      let username=this.tokenService.getUserName();
      //Cargo el usuario por username
      this.usuarioService.cargarUsuarioU(username)
        .subscribe((resp:any)=>{
          this.usuario=resp;
        this.roleName=this.usuario.roles[0].roleName;
      });
      
      if(this.roleName==='ROLE_ADMIN'){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      } 
  }
  
}
