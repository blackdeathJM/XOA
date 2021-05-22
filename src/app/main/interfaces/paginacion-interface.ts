import {IAncho} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';

export interface IInfoPaginacion
{
    pagina: number;
    paginas: number;
    elementosPorPagina: number;
    total: number;
}

export interface IResPropiedadesTabla
{
    llaveLista: string;
    definicionLlave: string;
}

export interface ITablaColumnas
{
    propiedad: string;
    subPropiedad?: string;
    etiqueta: string;
    columnaSpan?: number;
    ancho?: IAncho;
    color?: string;
    pipe?: string;
}
