import {ThemePalette} from '@angular/material/core';

export interface ITngTabla
{
    icono: string;
    accion: string;
    claseColor?: string;
    color?: ThemePalette;
}

export interface IAccionPipe
{
    id: string;
    param: string;
}

export enum PARAMETROS_PIPE
{
    DEFAULT = 'DEFAULT'
}
