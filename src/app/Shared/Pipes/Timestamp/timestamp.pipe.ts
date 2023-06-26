import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(date: Date): unknown {
    return moment(date).fromNow();
  }

}
