import {ThemePalette} from '@angular/material/core';

export interface IAccionesPrimeTabla
{
    icono: string;
    accion: string;
    color?: ThemePalette;
    claseColor?: string;
    tooltip?: string;
}

export interface IAccPipe
{
    id: string;
    param: string;
}

export enum ParamPipe
{
    parametrosElectricos = 'parametrosElectricos',
    ordenesDeTrabajo = 'ordenesDeTrabajo',
    folios = 'folios'
}

export interface IEventoAcciones
{
    accion: string;
    datos: any;
    archivo: string[];
}

export interface IAncho
{
    width: string;
}

export interface IOpcionesCarga
{
    multiple: boolean;
    color?: ThemePalette;
    claseColorBtn?: string;
    claseColorIcon?: string;
    allowedMimeType: string[];
    allowedFileType: string[];
    icono: string;
    autoCargar: boolean;
    prefijo: string;
    esIconButton: boolean;
    reemplazar: boolean;
    nombreReemplazar?: string;
    accion?: string;
    param?: string;
    tooltip?: string;
    textoBoton?: string;
    columnasSpan?: string;
}
