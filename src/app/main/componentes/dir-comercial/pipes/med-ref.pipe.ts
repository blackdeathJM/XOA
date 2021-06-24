import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medRef'
})
export class MedRefPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
