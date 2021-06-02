import {ICliente} from '@dir-comercial/cliente.interface';

export interface ISolicitudServ
{
    _id: string;
    idCliente: string;
    noPersonas: number;
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    servSolicitado: string;
    medidorRef: string;
    tipoPredio: string;
    areaPredio: number;
    areaConstruida: number;
    almacenamiento: string;
    tarifa: string;
    comentarios: string;
    observaciones: string;
    ejecutadaPor: string;
    aprobadoServ: boolean;
    matArroyoCalle: string;
    matAcera: string;
    pagoServRealizado: boolean;
    cliente?: ICliente;
}

export interface IResSolicitud
{
    estatus: boolean;
    mensaje: string;
    documento: ISolicitudServ;
    documentos: ISolicitudServ[];
}
