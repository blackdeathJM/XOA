import {Pipe, PipeTransform} from '@angular/core';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';
import moment from 'moment';

@Pipe({
    name: 'miPipe'
})
export class MiPipePipe implements PipeTransform
{

    transform(value: string | number, tipoPipe: string): any
    {
        switch (tipoPipe)
        {
            case TiposPipe.fecha:
                if (value)
                {
                    return moment(value).format('MM/DD/YYYY');
                } else
                {
                    return value;
                }
            case TiposPipe.moneda:
                if (value)
                {
                    return new Intl.NumberFormat('en-US',
                        {
                            style: 'currency',
                            currency: 'MXN',
                            minimumFractionDigits: 2,
                        }).format(value as number);
                }
                break;
            case TiposPipe.numero:
                if (value)
                {
                    return new Intl.NumberFormat().format(value as number);
                }
                break;
            case TiposPipe.numConDec:
                if (value)
                {
                    return new Intl.NumberFormat('en-US', {minimumFractionDigits: 2}).format(parseFloat(value as string));
                }
                break;
            default:
                return value;
        }
    }

}
