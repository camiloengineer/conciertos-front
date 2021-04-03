import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reemplazarSigno'
})
export class ReemplazarSignoPipe implements PipeTransform {
  
  //Este pipe sirve para reemplazar caracteres
  transform(value: string, strToReplace: string, replacementStr: string): string {

    if (!value || !strToReplace || !replacementStr) {
      return value;
    }

    return value.replace(new RegExp(this.escapeStr(strToReplace), 'g'), replacementStr);
  }

  escapeStr(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

}
