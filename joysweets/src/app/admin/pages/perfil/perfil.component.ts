import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario:Usuario;

  constructor(public usuarioService:UsuarioService) {

    this.usuario=this.usuarioService.usuario;
    console.log(this.usuario);
   }

  ngOnInit(): void {
  }

}
