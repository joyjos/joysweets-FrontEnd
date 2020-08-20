import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value:any):any{
    if(!value) return ''
    return _.sortBy(value, function(post){return post.idPost;}).reverse() //Ordeno de forma descendente
  }

}
