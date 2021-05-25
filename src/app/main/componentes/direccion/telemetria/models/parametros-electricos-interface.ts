import {NumberConfig} from '@rxweb/reactive-form-validators/models/config';

export interface IParametrosElectricos
{
    voltajes: IParams[];
    amperajes: IParams[];
    factorPotencia: IParams[];
    kilowatts: IParams[];
}

export interface IParams
{
    id: string;
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}

export interface IParamsCtrls
{
    _id: string;
    esAgregar: boolean;
    param: string;
    titulo: string;
    sufijo: string;
    fechaVisible: boolean;
    longMax: NumberConfig;
}
