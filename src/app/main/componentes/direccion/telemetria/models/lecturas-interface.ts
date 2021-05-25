import {NumberConfig} from '@rxweb/reactive-form-validators/models/config';

export interface ILecturasT
{
    macro: ILecturas[];
    cfe: ILecturas[];
    nivelD: ILecturas[];
    nivelE: ILecturas[];
}

export interface ILecturas
{
    ano: number;
    ene: number;
    feb: number;
    mar: number;
    abr: number;
    may: number;
    jun: number;
    jul: number;
    ago: number;
    sep: number;
    oct: number;
    nov: number;
    dic: number;
    total: number;
}

export interface IParamsMediciones
{
    _id: string;
    datos: ILecturas;
    esAgregar: boolean;
    valorMax: NumberConfig;
    tipoLect: string;
    sufijo: string;
}

export enum eTiposLect
{
    macro = 'macro',
    cfe = 'cfe',
    nivelE = 'nivelE',
    nivelD = 'nivelD'
}
