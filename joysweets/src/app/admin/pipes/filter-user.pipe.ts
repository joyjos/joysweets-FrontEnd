import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg==='' || arg.lenght<3) return value;
    const results = [];
    for(const usuario of value){
      if(usuario.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         results.push(usuario);
      };
    };
    return results;
  }

}
