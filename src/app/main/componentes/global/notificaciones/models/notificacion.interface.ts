export interface INotificacion
{
    _id?: string;
    descripcion: string;
    emisor: string;
    receptor: string[];
    fechaEnvio: string;
    visto: boolean;
    prioridad: string;
}

export interface IResNotificacion
{
    estatus: boolean;
    mensaje: string;
    documento: INotificacion;
    documentos: INotificacion[];
}

export enum PRIORIDAD
{
    BAJA = 'baja',
    NORMAL = 'normal',
    ALTA = 'alta'
}
