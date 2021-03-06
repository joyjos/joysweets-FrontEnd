import { Component, OnInit } from '@angular/core';

//Modelos
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

  //Creo el filtro vacío
  filteruser='';

  //Variable para la paginación
  page:number;

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

    // if(usuario.idUsuario===this.usuarioService.usuario.idUsuario){
    //   Swal.fire('No puede borrar usuario', 'No puede borrarse a sí mismo', 'error');
    //   return;
    // }

      Swal.fire({
        title: 'Estás seguro?',
        html: 'Estás a punto de borrar a <br><span style="color:#197AAA">'+usuario.nombre+'</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'No, cancela!'
      }).then((borrar) => {

        //console.log(borrar);

        if (borrar.value) {
          this.usuarioService.borrarUsuario(usuario.idUsuario)
            .subscribe(resp=>{
              console.log(resp);
               this.cargarUsuarios();
            });
          Swal.fire(
            'Borrado!',
            '<span style="color:#197AAA">'+usuario.nombre+'</span> ha sido borrado',
            'success'
          )
        }
      });
  }

}
