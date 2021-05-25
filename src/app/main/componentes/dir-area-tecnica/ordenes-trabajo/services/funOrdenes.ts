import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';

export const columnasOrdenes = (): ITablaColumnas[] => [
    {etiqueta: 'No. Orden', propiedad: 'noOrden'},
    {etiqueta: 'Problema', propiedad: 'descProblema', columnaSpan: 2},
    {etiqueta: 'Departamento', propiedad: 'departamento'},
    {etiqueta: 'Creada por', propiedad: 'creadaPor'},
    {etiqueta: 'Fecha orden', propiedad: 'fechaOrden'},
    {etiqueta: 'fecha Ejecucion', propiedad: 'fechaEjecucion'}
];
