import {IInfoPaginacion} from '@funcionesRaiz/paginacion-interface';

export interface IDepartamento
{
    _id?: string;
    nombre: string;
    centroGestor: string;
}

export interface IResDepto
{
    info: IInfoPaginacion;
    estatus?: boolean;
    mensaje?: string;
    documentos?: IDepartamento[];
    documento?: IDepartamento;
}
