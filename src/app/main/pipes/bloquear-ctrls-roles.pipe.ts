import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bloquearCtrlsRoles'
})
export class BloquearCtrlsRolesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
