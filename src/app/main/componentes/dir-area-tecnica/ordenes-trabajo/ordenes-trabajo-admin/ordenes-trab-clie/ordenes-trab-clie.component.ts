import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {OrdenesTrabajoState} from '../../state/ordenes-trabajo.state';
import {Subscription} from 'rxjs';
import {IOrdenTrabajo} from '../../models/ordenes-trabajo';
import {Role} from '@modelosUsuarios/usuario.interface';
import {SesionState} from '@usuarios/state/sesion.state';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';

@Component({
    selector: 'app-ordenes-trab-clie',
    templateUrl: './ordenes-trab-clie.component.html',
    styleUrls: ['./ordenes-trab-clie.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesTrabClieComponent
{
    ordenTrabajo: IOrdenTrabajo;
    tiposOrden: string[] = [Role.telemetria, Role.areaTecnica];
    tipoOrden: string;
    estaCargando: boolean;

    subscripcion: Subscription = new Subscription();
    columnas: ITablaColumnas[] =
        [
            {etiqueta: 'No. Orden', propiedad: 'noOrden', pipe: TiposPipe.numero},
            {etiqueta: 'Problema', propiedad: 'anomalia', columnaSpan: 2},
            {etiqueta: 'Creada por', propiedad: 'creadaPor'},
            {etiqueta: 'Fecha orden', propiedad: 'fechaOrden', pipe: TiposPipe.fecha}
        ];

    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'info',
                icono: 'info',
                color: 'primary',
                tooltip: 'Dar por terminada orden de trabajo'
            },
            {
                accion: 'editar',
                icono: 'edit',
                color: 'primary',
                tooltip: 'Dar por terminada orden de trabajo'
            }
        ];

    constructor(public _ordenesState: OrdenesTrabajoState, private _sesionState: SesionState, private _cd: ChangeDetectorRef)
    {
    }

    ordenesFil(estatus: string): void
    {
        this.estaCargando = true;
        this.subscripcion.add(this._ordenesState.ordenesTrabEstatus(this._sesionState.snapshot.departamentoID, estatus, false).subscribe(() =>
        {
            this.estaCargando = false;
            this._cd.detectChanges();
        }));
    }

    accionRecibida(evento: IEventoAcciones): void
    {
        const ordenTrabajo = evento.datos as IOrdenTrabajo;
        switch (evento.accion)
        {
            case 'info':
                this.tipoOrden = ordenTrabajo.tipoOrden;
                this.ordenTrabajo = ordenTrabajo;
                break;
            case 'editar':
                break;
            case 'rest':
                this.ordenTrabajo = null;
                break;
        }
    }
}
