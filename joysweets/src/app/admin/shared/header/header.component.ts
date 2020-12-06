import { Component, OnInit } from '@angular/core';

//Modelos
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //En el objeto info almaceno los valores del token, username y los privilegios
  info: any = {};

  //Creo un usuario de tipo Usuario vacío
  usuario:Usuario;

  constructor(public authService:AuthService, public tokenService:TokenService, public usuarioService:UsuarioService) {

    //Cargo el username
    let username=this.tokenService.getUserName();
    
    //Cargo el usuario por username
    this.cargarUsuarioU(username);
    
   }

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities(),
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

