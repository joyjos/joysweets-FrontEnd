import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: any): any {
    if(value=='ROLE_ADMIN'){
      return 'ADMIN';
    }else{
      return 'USER';
    }
  }

}
