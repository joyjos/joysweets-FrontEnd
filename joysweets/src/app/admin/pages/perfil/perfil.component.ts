import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { FormGroup, FormControl } from '@angular/forms';

//Servicios
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  forma:FormGroup;

  //Creo un usuario de tipo Usuario vacío
  usuario:Usuario[]=[];

  constructor(public usuarioService:UsuarioService, public tokenService:TokenService) {

    //Cargo el username
    let username=this.tokenService.getUserName();
    
    //Cargo el usuario por username
    this.cargarUsuarioU(username);

   }

  ngOnInit(): void {

    //Validaciones
    this.forma=new FormGroup({
      nombre:new FormControl(null),
      username:new FormControl(null)
    });
  }

  //=============================================
  //Método para cargar un usuario por username
  //=============================================
  cargarUsuarioU(username:string){
    this.usuarioService.cargarUsuarioU(username)
      .subscribe((resp:any)=>{
        //console.log(resp);

        this.usuario=resp;

        //Establezco los valores de los campos
        this.forma.controls['nombre'].setValue(resp.nombre);
        this.forma.controls['username'].setValue(resp.username);
      });
  }

}
