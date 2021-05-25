import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-inventario-almacen',
    templateUrl: './inventario-almacen.component.html',
    styleUrls: ['./inventario-almacen.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventarioAlmacenComponent implements OnInit
{
    columnasInventario: ITablaColumnas[] =
        [
            {
                etiqueta: 'Clave',
                propiedad: 'clave'
            },
            {
                etiqueta: 'Descripcion',
                propiedad: 'descripcion'
            },
            {
                etiqueta: 'Existencia',
                propiedad: 'existencia'
            },
            {
                etiqueta: 'Precio Unitario',
                propiedad: 'precioU'
            },
            {
                etiqueta: 'Total',
                propiedad: 'total'
            }
        ];
    columnasEntradas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Fecha registro',
                propiedad: 'fechaReg'
            },
            {
                etiqueta: 'Cantidad',
                propiedad: 'cantidad'
            },
            {
                etiqueta: 'Precio unitatio',
                propiedad: 'precioU'
            },
            {
                etiqueta: 'Total',
                propiedad: 'total'
            }
        ];
    columnasSalidas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Fecha salida',
                propiedad: 'fechaSalida'
            },
            {
                etiqueta: 'Cantidad',
                propiedad: 'cantidad'
            },
            {
                etiqueta: 'Departamento',
                propiedad: 'departamento'
            }
        ];

    constructor() { }

    inventario: any[] =
        [
            {
                tipo: 'Inventario',
                columnas: this.columnasInventario
            },
            {
                tipo: 'Entradas',
                columnas: this.columnasEntradas
            },
            {
                tipo: 'Salidas',
                columnas: this.columnasSalidas
            }
        ];

    ngOnInit(): void
    {
    }

}
