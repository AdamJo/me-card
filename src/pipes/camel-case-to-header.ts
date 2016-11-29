import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToHeader'
})

export class CamelCaseToHeaderPipe implements PipeTransform  {
  transform(title: string): string {
    let newTitle = '';
    for (var i = 0, len = title.length; i < len; i++) {
      if (i === 0) {
        newTitle += title[i].charAt(i).toUpperCase();
      } else if (title[i] === title[i].toUpperCase()) {
        newTitle += ` ${title[i].toUpperCase()}`
      } else {
        newTitle += title[i]
      }
    }
    return newTitle
  }
}
