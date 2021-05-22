export interface IBomba
{
    id: string;
    serie: string;
    marca: string;
    modelo: string;
    noImpulsores: number;
    rpm: number;
    tipo: string;
    diametro: number;
    lts: number;
    descripcion: string;
    eficiencia: number;
    fechaInstalacion: string;
    fechaRetiro: string;
    observaciones: string;
    imgEvidenciaInst: string[];
    imgEvidenciaRet: string[];
    activa: boolean;
    motivoRetiro: string;
}

export interface IMotor
{
    id: string;
    serie: string;
    marca: string;
    modelo: string;
    hp: number;
    voltaje: number;
    amperaje: number;
    factPotencia: number;
    eficiencia: number;
    descripcion: string;
    fechaInstalacion: string;
    fechaRetiro: string;
    observaciones: string;
    imgEvidenciaInst: string[];
    imgEvidenciaRet: string[];
    activa: boolean;
    motivoRetiro: string;
}

export interface IAccEquipo
{
    _id: string;
    nombreMutacion: string;
    equipo: IMotor | IBomba;
}

export interface IBajaEquipo
{
    _id: string;
    id: string;
    equipo: string;
}
