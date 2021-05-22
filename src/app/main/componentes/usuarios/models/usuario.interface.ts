import {IDepartamento} from '@global/models/departamento.model';


export interface IUsuario
{
    departamentoID: string;
    nombre: string;
    usuario: string;
    contrasena: string;
    role: Role[];
    _id?: string;
    img?: string;
    departamento?: IDepartamento;
}

export interface IResUsuario
{
    estatus: boolean;
    mensaje: string;
    documento?: IUsuario;
    documentos?: IUsuario[];
}

export interface ILoginToken
{
    estatus: boolean;
    mensaje: string;
    token?: string;
}

export interface IDatosLogin
{
    usuario: string;
    contrasena: string;
}

export enum Role
{
    superadmin = 'SUPERADMIN',
    presidencia = 'PRESIDENCIA',
    telemetria = 'TELEMETRIA',
    areaTecnica = 'AREA TECNICA',
    contratos = 'CONTRATOS',
    atencionUsuarios = 'ATENCION A USUARIOS',
    controlPatrimonial = 'CONTROL PATRIMONIAL'
}

export interface ICambioRol
{
    usuario: string;
    token: string;
}