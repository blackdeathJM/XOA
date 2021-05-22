import {Pipe, PipeTransform} from '@angular/core';
import {IAccionPipe} from '@shared/widgets/tablas/ng-table/models/t-ng-tabla-interface';

@Pipe({
    name: 'tNgTablaDesh'
})
export class TNgTablaDeshPipe implements PipeTransform
{

    transform(value: any, param: IAccionPipe): boolean
    {
        switch (param.param)
        {
            default:
                return false;
        }
    }

}
