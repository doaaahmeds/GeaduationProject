import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Egypt'
})
export class EgyptPipe implements PipeTransform {

  transform(value: string |null): string  | null {
    let value2 : string | null = null;

    if(typeof value === 'string'){
         value2= value.replace(/\$/,'LE ');
         return value2;
    }
    return value  ;
  }

}
