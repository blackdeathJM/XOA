import {InjectionToken} from '@angular/core';

export const ORDENES_TRAB_WIDGET = new InjectionToken<IOrdenesTrabWidget>('Ordenes trabajo');

export interface IOrdenesTrabWidget
{
    consulta: (estatus: string) => void;
}
