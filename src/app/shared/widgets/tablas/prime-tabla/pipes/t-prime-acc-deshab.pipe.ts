import {Pipe, PipeTransform} from '@angular/core';
import {IAccPipe, ParamPipe} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';

@Pipe({
    name: 'tPrimeAccDeshabPipe'
})
export class TPrimeAccDeshabPipe implements PipeTransform
{
    transform(value: any, param: IAccPipe): boolean
    {
        switch (param.param)
        {
            case ParamPipe.ordenesDeTrabajo:
            {
                if (param.id === 'terminarOrden')
                {
                    if (value.estatus === 'TERMINADO')
                    {
                        return true;
                    }
                }
                return false;
            }
            default:
                return false;
        }
    }
}
