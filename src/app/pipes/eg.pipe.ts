import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eG'
})
export class EGPipe implements PipeTransform {

  transform(value: string |null): string  | null {
    let value2 : string | null = null;

    if(typeof value === 'string'){
         value2= value.replace(/\$/,'LE ');
         return value2;
    }
    return value  ;
  }

}
