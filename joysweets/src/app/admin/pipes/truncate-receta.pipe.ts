import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateReceta'
})
export class TruncateRecetaPipe implements PipeTransform {

  transform(value: string, limit = 250, completeWords = false, ellipsis = ' [...]') {

    if (value.length < limit)
    return `${value.substr(0, limit)}`;
 
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
 }

}
