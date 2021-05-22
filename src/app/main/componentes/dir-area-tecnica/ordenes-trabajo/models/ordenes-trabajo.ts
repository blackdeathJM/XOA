import {IDepartamento} from '@global/models/departamento.model';

export interface IOrdenTrabajo
{
    _id?: string;
    noOrden?: number;
    departamentoId: string;
    fechaOrden: string;
    fechaEjecucion?: string;
    tipoOrden: string;
    comentarios: string;
    anomalia: string;
    observaciones?: string;
    ordenAtencion?: string;
    estatus: string;
    creadaPor: string;
    ejecutadaPor?: string;
    prioridad: string;
    ordenTelemetria?: IOrdenTelemetria;
    ordenAreaTecnica?: IOrdenAreaTecnica;
    notasAlmacen?: Array<INotas>;
    departamento?: IDepartamento;
}

export interface IOrdenTelemetria
{
    instalacion: string;
}

export interface IOrdenAreaTecnica
{
    rpu: string;
    noContrato: string;
    noMedidor: string;
    nombre: string;
    apellidos: string;
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    telefonos: Array<string>;
}

interface OrdenContratos
{
    rpu: string;
    nombre: string;
    calle: string;
    colonia: string;
    contacto: Array<string>;
    noMedidor: string;
    tipoMedidor: string;
}

interface INotas
{
    nota: string;
    material: Array<IMaterial>;
}

interface IMaterial
{
    cantidad: number;
    descripcion: string;
    uMedida: string;
}

export interface IResOrdenTrabajo
{
    estatus: boolean;
    mensaje: string;
    documento: IOrdenTrabajo;
    documentos: IOrdenTrabajo[];
}

export enum TipoAnomalia
{
    tele,
    areaT,
    otros
}
