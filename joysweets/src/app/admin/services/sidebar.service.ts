import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //Creo un objeto menu con sus opciones (es una array de objetos)
  menu:any=[
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {titulo: 'Usuarios', url: '/admin/usuarios'},
        {titulo: 'Recetas', url: '/admin/posts'},
        {titulo: 'Comentarios', url: '/admin/comentarios'}
      ]
    }
  ];

  constructor() { }
}
