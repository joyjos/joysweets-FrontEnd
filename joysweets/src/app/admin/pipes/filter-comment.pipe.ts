import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterComment'
})
export class FilterCommentPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results = [];
    for(const comentario of value){
      if(comentario.comentario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         results.push(comentario);
      };
    };
    return results;
  }

}
