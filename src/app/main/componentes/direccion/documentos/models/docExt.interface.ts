import {ProcesosDoc} from '@Config/enums';

export interface IDocExt
{
    noSeguimiento: number;
    identificadorDoc: string;
    folio: string;
    tipoDoc: string;
    esInterno: boolean;
    dependencia: string;
    comentario?: string;
    asunto?: string;
    docUrl?: string;
    docRespUrl?: string;
    acuseUrl?: string;
    fechaRecepcion: string;
    fechaLimiteEntrega: string;
    fechaTerminado?: string;
    proceso: ProcesosDoc;
    notificarAdministrador: boolean;
    usuarioFolio: string;
    _id?: string;
    enviadoPor: string;
    ano: number;
    ref: boolean;
    usuarioDestino: IUsuarioDestinoDocExt[];
}

export interface IUsuarioDestinoDocExt
{
    usuario: string;
    subproceso: ProcesosDoc;
    docUrl?: string;
    autorizado?: boolean;
    notificarRespDelUsuario: boolean;
    notificarUsuario: boolean;
    fechaEnvio?: string;
    observaciones?: string;
}

export interface IResDocEx
{
    estatus: boolean;
    mensaje: string;
    documento: IDocExt;
    documentos: IDocExt[];
}
