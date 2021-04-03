import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  //Transforma la data de un timestamp a date
  transform(value: number | string): Date {
    return new Date( Number(value) * 1000 );
  }

}
