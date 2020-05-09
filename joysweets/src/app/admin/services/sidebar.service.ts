import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //Creo un objeto menu con sus opciones (es una array de objetos)
  menu:any=[
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/admin/dashboard'},
        {titulo: 'Usuarios', url: '/admin/usuarios'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/admin/dashboard/usuarios'},
        {titulo: 'Recetas', url: '/admin/dashboard/posts'},
        {titulo: 'Comentarios', url: '/admin/dashboard/comentarios'}
      ]
    }
  ];

  constructor() { }
}
