import {Pipe, PipeTransform} from '@angular/core';
import {IAccPipe, ParamPipe} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ProcesosDoc} from '@Config/enums';

@Pipe({
    name: 'tPrimeAccVisiblePipe'
})
export class TPrimeAccVisiblePipe implements PipeTransform
{
// value es la informacion
    // params es la accion que esta definida para ese boton
    transform(value: any, param: IAccPipe): boolean
    {
        switch (param.param)
        {
            case ParamPipe.parametrosElectricos:
                if (param.id === 'mActivo')
                {
                    return !value.activa;
                }
                if (param.id === 'mInactivo')
                {
                    return value.activa;
                }
                return false;
            case ParamPipe.folios:
                switch (param.id)
                {
                    case 'verDocumento':
                        return !value.docUrl;
                    case 'verDocResp':
                        return !value.docRespUrl;
                    case 'verAcuse':
                        return !value.acuseUrl;
                    case 'subirResp':
                        return !!value.docRespUrl;
                    case 'subirAcuse':
                        return value.proceso !== 'ACUSE';
                    case 'terminarProceso':
                        if (value.esInterno)
                        {
                            return value.proceso !== ProcesosDoc.acuse;
                        } else
                        {
                            return true;
                        }
                    default:
                        return false;
                }
        }
    }
}
