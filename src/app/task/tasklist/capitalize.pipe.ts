//Custom pipe
//Usage of this pipe
//Converting string which is in small case to 1st letter in uppercase
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any) {
    const str = value; //value holds a task description which is in small case
    const str1 = str.charAt(0).toUpperCase() + str.slice(1); //converting 1st letter of task description to uppercase.
    return str1;
  }
}
