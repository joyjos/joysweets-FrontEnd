import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuarios.model';

//Servicios
import { UsuarioService } from '../../services/usuario.service';

//Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  form:FormGroup;

  //Creo un usuario de tipo Usuario vacío
  usuario:Usuario[]=[];

  roles:any[]=[];

  constructor(public usuarioService:UsuarioService, public activateRoute:ActivatedRoute, public router:Router) { 

    //Obtengo el id que paso por la url
    activateRoute.params.subscribe(params=>{
      let id=params['id'];

      //Cargo el usuario
      this.cargarUsuario(id);

    });
  }

  ngOnInit(): void {

    //Validaciones
    this.form=new FormGroup({
      nombre:new FormControl(null, Validators.required),
      username:new FormControl(null, Validators.required),
      rol:new FormControl(null, Validators.required),
      idUsuario:new FormControl
    });
  }

  //==========================================
  //Método para cargar un usuario por id
  //==========================================
  cargarUsuario(id:number){
    this.usuarioService.cargarUsuario(id)
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.usuario=resp;

        //Establezco los valores de los campos
        this.form.controls['nombre'].setValue(resp.nombre);
        this.form.controls['username'].setValue(resp.username);
        this.form.controls['rol'].setValue(resp.roles[0].roleName);
        this.form.controls['idUsuario'].setValue(resp.idUsuario);
      })
  }

  //=======================================
  //Método para actualizar un usuario
  //=======================================
  actualizarUsuario(){

    //Creo el objeto de tipo Usuario
    /* let nuevoUsuario2=new Usuario(
      this.forma.value.nombre,
      this.forma.value.username,
      this.forma.value.idUsuario,
      this.forma.value.rol
    ); */

    let idRol: number;

    //Le paso al objeto de tipo Usuario el idRol
    if(this.form.value.rol=='ROLE_ADMIN'){
      idRol=1
    }else{
      idRol=2
    }

    //Creo el objeto de tipo Usuario
    let nuevoUsuario={
      'nombre':this.form.value.nombre,
      'username':this.form.value.username,
      'idUsuario':this.form.value.idUsuario,
      'roles':[
        {
          'idRol':idRol,
          'rolName': this.form.value.rol
        }
      ]
    }

    //console.log(nuevoUsuario);

    this.usuarioService.actualizarUsuario(nuevoUsuario)
      .subscribe((resp:any)=>{
        //console.log(resp);
        //Actualizado el usuario, regreso a la página de usuarios
        this.router.navigate(['/admin/usuarios']);
      }, error=>{
        console.log(error.status);
        Swal.fire('Error al actualizar', error.error.mensaje, 'error');
      });
  }

}
