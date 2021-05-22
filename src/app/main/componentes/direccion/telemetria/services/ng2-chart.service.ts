import {Injectable} from '@angular/core';
import {forEach, orderBy} from 'lodash-es';
import {GralesServices} from '@services/grales.service';

@Injectable({
    providedIn: 'root'
})
export class Ng2ChartService
{
    static etiquetasDeParametros(etiqueta: any): string[]
    {
        const etiquetaMostrar: string[] = [];
        if (etiqueta !== undefined)
        {
            forEach(etiqueta, (valores, l) =>
            {
                if (l !== '__typename')
                {
                    etiquetaMostrar.push(l);
                }
            });
            return etiquetaMostrar;
        } else
        {
            return [];
        }
    }

    static async graficadoSimple(datos: any, argObj: string, filtroComparar: number, filtroDelObjeto: string, datosEjeX: string,
                                 datosEjeY: string): Promise<any[]>
    {
        if (datos)
        {
            const ejeX: any[] = [];
            const ejeY: number[] = [];

            orderBy(datos[argObj], datosEjeX, 'asc').forEach(v =>
            {
                if (v[filtroDelObjeto] === parseInt(String(filtroComparar), 10))
                {
                    if (datosEjeX === 'mes')
                    {
                        ejeX.push(GralesServices.convertirMes(v[datosEjeX]));
                        ejeY.push(v[datosEjeY]);
                    } else
                    {
                        ejeX.push(v[datosEjeX]);
                        ejeY.push(v[datosEjeY]);
                    }
                }
            });
            return [ejeX, ejeY];
        } else
        {
            return [[], []];
        }
    }
}
