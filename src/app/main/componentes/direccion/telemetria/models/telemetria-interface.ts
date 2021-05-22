export interface ITelemetria
{
    radio: string[];
    plc: string[];
    switch: string[];
    repetidor: string[];
    camara: string[];
}

export interface IRegIp
{
    _id: string;
    esActualizacion: boolean;
    tipo: string;
    ip: string;
    indice?: number;
}
