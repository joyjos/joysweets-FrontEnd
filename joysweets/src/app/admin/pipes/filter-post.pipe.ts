import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPost'
})
export class FilterPostPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results = [];
    for(const post of value){
      if(post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         results.push(post);
      };
    };
    return results;
  }

}
