import { Pipe, PipeTransform } from '@angular/core';

//Pipes
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: number): string {
    const absValue = Math.abs(value);
    let formattedValue: string;

    if (absValue >= 1e9) {
      formattedValue = this.decimalPipe.transform(value / 1e9, '1.0-2') + 'B';
    } else if (absValue >= 1e6) {
      formattedValue = this.decimalPipe.transform(value / 1e6, '1.0-2') + 'M';
    } else if (absValue >= 1e3) {
      formattedValue = this.decimalPipe.transform(value / 1e3, '1.0-2') + 'K';
    } else {
      formattedValue = this.decimalPipe.transform(value, '1.0-1');
    }

    return formattedValue;
  }

}
