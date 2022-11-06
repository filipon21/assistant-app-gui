import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any): string {
    if (value){
      return this.datePipe.transform(value,
        "yyyy-MM-dd HH:mm")
    }
  }

}
