import {IBomba, IMotor} from './equipo-electrico-interface';
import {ILecturasT} from './lecturas-interface';
import {IMedidor} from './medidor-interface';
import {IParametrosElectricos} from './parametros-electricos-interface';
import {ITelemetria} from './telemetria-interface';

export interface IInstalacion
{
    _id?: string;
    nombre: string;
    direccion: string;
    noInstalacion: number;
    profPozo: number;
    diamPerfo: number;
    diamAdeme: number;
    diamColumna: number;
    longColumna: number;
    fechaReg: string;
    fechaRet: string;
    activo?: boolean;
    telemetria?: ITelemetria;
    parametrosElectricos?: IParametrosElectricos;
    bomba?: IBomba[];
    motor?: IMotor[];
    lecturas?: ILecturasT;
    medidores?: IMedidor[];
}
