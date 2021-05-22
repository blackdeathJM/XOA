export interface IWidget
{
    cargando?: () => void;
    estaCargando: boolean;
    tieneDatos: boolean;
    totalElementos?: number;
    elementosPorPagina?: number;
}
