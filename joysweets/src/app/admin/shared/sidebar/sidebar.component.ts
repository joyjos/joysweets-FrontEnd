import { Component, OnInit } from '@angular/core';

//Modelos
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

const USERNAME_KEY = 'AuthUserName';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //En el objeto info almaceno los valores del token, username y los privilegios
  info: any = {};

  //Creo un usuario de tipo Usuario vacío
  usuario:Usuario;

  roleName:string;

  constructor(public sidebarService:SidebarService, public usuarioService:UsuarioService, public authService:AuthService, public tokenService:TokenService) {

    //Cargo el username del Local Storage
    let username=localStorage.getItem(USERNAME_KEY);
    //console.log(username);

    //Cargo el usuario por username
    this.cargarUsuarioU(username);

    //Busco el rolName para ocultar parte del panel a los usuarios que no son ADMIN
    this.usuarioService.cargarUsuarioU(username)
        .subscribe((resp:any)=>{
          this.usuario=resp;
          this.roleName=this.usuario.roles[0].roleName;
      });
   }

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };
  }

  //=============================================
  //Método para cargar un usuario por username
  //=============================================
  cargarUsuarioU(username:string){
    this.usuarioService.cargarUsuarioU(username)
      .subscribe((resp:any)=>{
        //console.log(resp);

        this.usuario=resp;
      });
  }

}
