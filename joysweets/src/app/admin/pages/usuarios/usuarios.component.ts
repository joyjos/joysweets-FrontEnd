import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../../models/NuevoUsuario';
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  //Creo el array usuarios
  usuarios:NuevoUsuario[]=[];

  constructor(public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  //==================================
  //Método para cargar los usuarios
  //==================================
  cargarUsuarios(){
    this.usuarioService.cargarUsuarios()
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.usuarios=resp;
      })
  }

  //================================
  //Método para buscar un usuario
  //================================
  buscarUsuario(termino:string){
    console.log(termino);
  }

  //================================
  //Método para borrar un usuario
  //================================
  borrarUsuario(usuario:Usuario){
    //console.log(usuario);

      Swal.fire({
        title: 'Estás seguro?',
        text: 'Estás a punto de borrar a ' +usuario.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, bórralo'
      }).then((borrar) => {

        //console.log(borrar);

        if (borrar.value) {
          this.usuarioService.borrarUsuario(usuario.idUsuario)
            .subscribe(resp=>{
              //console.log(resp);
               this.cargarUsuarios();
            });
          Swal.fire(
            'Borrado!',
            usuario.nombre+ ' ha sido borrado',
            'success'
          )
        }
      });
  }

}
