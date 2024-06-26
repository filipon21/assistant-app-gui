import { Pipe, PipeTransform } from '@angular/core';

/**
 * Klasa służąca jako angularowy Pipe, który służy do zmiany
 * wyświetlania enumu statusowego na polskie tłumaczenie
 */
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any): string {
    if (value === 'REJECTED'){
      return 'Odrzucona przez pracownika'
    }
    if (value === 'ENDED'){
      return 'Zakończona'
    }
    if (value === 'CANCELLED'){
      return 'Odwołana'
    }
    if (value === 'WAITING'){
      return 'Oczekiwanie'
    }
    if (value === 'UPCOMING'){
      return 'Nadchodząca'
    }
  }

}
