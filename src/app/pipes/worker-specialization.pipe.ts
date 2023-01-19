import { Pipe, PipeTransform } from '@angular/core';

/**
 * Klasa służąca jako angularowy Pipe, który służy do zmiany
 * wyświetlania enumu specjalizacji lekarza na polskie tłumaczenie
 */
@Pipe({
  name: 'workerSpecialization'
})
export class WorkerSpecializationPipe implements PipeTransform {

  transform(value: any): string {
    if (value === 'ASSISTANT'){
      return 'Asystent'
    }
    if (value === 'INTERNIST'){
      return 'Internista'
    }
    if (value === 'ORTHOPAEDIST'){
      return 'Ortopeda'
    }
    if (value === 'NEUROLOGIST'){
      return 'Neurolog'
    }
    if (value === 'PEDIATRICIAN'){
      return 'Pediatra'
    }
    if (value === 'SURGEON'){
      return 'Chirurg'
    }
    if (value === 'OPHTHALMOLOGIST'){
      return 'Okulista'
    }
    if (value === 'PSYCHIATRIST'){
      return 'Psychiatra'
    }
    if (value === 'CARDIOLOGIST'){
      return 'Kardiolog'
    }
    if (value === 'PSYCHOLOGIST'){
      return 'Psycholog'
    }
    if (value === 'DERMATOLOGIST'){
      return 'Dermatolog'
    }
  }

}
