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
        {titulo: 'Dashboard', url: '/admin/dashboard'}
      ]
    }
  ];

  constructor() { }
}
