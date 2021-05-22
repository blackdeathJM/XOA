import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegInstalacionComponent} from '@telemetria/instalaciones/instalacion/reg-instalacion/reg-instalacion.component';
import {fuseAnimations} from '@plantilla/animations';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {Subscription} from 'rxjs';
import {IInstalacion} from '@telemetria/instalacion-interface';

@Component({
    selector: 'app-instalacion',
    templateUrl: './instalacion.component.html',
    styleUrls: ['./instalacion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class InstalacionComponent
{
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Nombre',
                propiedad: 'nombre',
                columnaSpan: 2
            },
            {
                etiqueta: 'Direccion',
                propiedad: 'direccion',
                columnaSpan: 2
            },
            {
                etiqueta: 'Prof pozo',
                propiedad: 'profPozo'
            },
            {
                etiqueta: 'Diam perf',
                propiedad: 'diamPerfo'
            },
            {
                etiqueta: 'Diam ademe',
                propiedad: 'diamAdeme'
            },
            {
                etiqueta: 'Long colum',
                propiedad: 'diamColumna'
            }
        ];
    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'editar',
                icono: 'edit',
                color: 'primary'
            }
        ];
    subscripcion: Subscription = new Subscription();
    instalaciones: IInstalacion[];

    constructor(private _dialogRef: MatDialog, public _instState: TelemetriaState)
    {
    }

    nvaInstalacion(): void
    {
        this._dialogRef.open(RegInstalacionComponent, {width: 'auto', data: ['regInstalacion', null]});
    }

    accionRecibida(evento: IEventoAcciones): void
    {
        switch (evento.accion)
        {
            case 'editar':
                this._dialogRef.open(RegInstalacionComponent, {width: 'auto', data: ['actInstalacion', evento.datos]});
                break;
        }
    }
}
