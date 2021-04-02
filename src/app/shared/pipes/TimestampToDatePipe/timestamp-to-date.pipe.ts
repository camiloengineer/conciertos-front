import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: number | string): string {
    return new Date( Number(value)).toLocaleString();
  }

}
