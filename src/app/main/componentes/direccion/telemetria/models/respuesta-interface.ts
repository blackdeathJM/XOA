import {IInstalacion} from './instalacion-interface';

export interface IResInstalacion
{
    estatus: boolean;
    mensaje: string;
    documento?: IInstalacion;
    documentos?: Array<IInstalacion>;
}
