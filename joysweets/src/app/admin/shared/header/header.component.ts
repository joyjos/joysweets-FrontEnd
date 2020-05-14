import { Component, OnInit } from '@angular/core';
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

  usuario:Usuario;

  constructor(public auth:AuthService, public tokenService:TokenService, public usuarioService:UsuarioService) {

      //Cargo el usuario
      this.cargarUsuario(1);
    
   }

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities(),
    };
  }

  //================================
  //Método para cargar un usuario
  //================================
  cargarUsuario(id:number){
    this.usuarioService.cargarUsuario(id)
      .subscribe((resp:any)=>{
        console.log(resp);

        this.usuario=resp;
      });
  }

}

