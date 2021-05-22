import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';

@Component({
    selector: 'app-notas-almacen',
    templateUrl: './notas-almacen.component.html',
    styleUrls: ['./notas-almacen.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class NotasAlmacenComponent
{

    constructor()
    {
    }

    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'No. Nota',
                propiedad: 'noNota',
            },
            {
                etiqueta: 'No. Orden',
                propiedad: 'noOrden',
            },
            {
                etiqueta: 'Departamento',
                propiedad: 'departamento'
            },
            {
                etiqueta: 'Fecha salida',
                propiedad: 'fechaSalida',
            },
            {
                etiqueta: 'Descripcion',
                propiedad: 'descripcion'
            },
            {
                etiqueta: 'cantidad',
                propiedad: 'cantidad'
            },
            {
                etiqueta: 'Medida',
                propiedad: 'unidadMedida'
            },
            {
                etiqueta: 'emitio',
                propiedad: 'emitio'
            },
            {
                etiqueta: 'recibio',
                propiedad: 'recibio'
            }

        ];
}
