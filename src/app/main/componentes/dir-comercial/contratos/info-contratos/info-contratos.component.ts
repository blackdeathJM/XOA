import {Component, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';

@Component({
    selector: 'app-info-contratos',
    templateUrl: './info-contratos.component.html',
    styleUrls: ['./info-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InfoContratosComponent
{
    columnasSolicitud: ITablaColumnas[] =
        [
            {
                etiqueta: 'Calle',
                propiedad: 'calle'
            },
            {
                etiqueta: 'Colonia',
                propiedad: 'colonia'
            },
            {
                etiqueta: 'Entre calles',
                propiedad: 'entreCalles'
            },
            {
                etiqueta: 'Referencia',
                propiedad: 'referencia'
            },
            {
                etiqueta: 'Medidor ref',
                propiedad: 'medidorRef'
            }
        ];
    constructor(public _solicitudPrev: SolicitudesState)
    {
    }
}
