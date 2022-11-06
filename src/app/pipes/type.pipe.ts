import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any): string {
    if (value === 'PHONE'){
      return 'Telefoniczna'
    }
    if (value === 'CHAT'){
      return 'Czat'
    }
    if (value === 'STATIONARY'){
      return 'Stacjonarna'
    }
  }

}
