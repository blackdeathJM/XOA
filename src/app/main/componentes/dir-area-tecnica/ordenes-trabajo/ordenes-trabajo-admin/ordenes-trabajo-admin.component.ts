import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {MatDialog} from '@angular/material/dialog';
import {RegOrdenTrabTeleComponent} from './registros/reg-orden-trab-tele/reg-orden-trab-tele.component';
import {OrdenesTrabajoState} from '../state/ordenes-trabajo.state';
import {tap} from 'rxjs/operators';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';
import {ActivatedRoute, Router} from '@angular/router';
import {IOrdenTrabajo} from '../models/ordenes-trabajo';
import {fuseAnimations} from '@plantilla/animations';
import {Subscription} from 'rxjs';
import {RegOrdenAreaTComponent} from './registros/reg-orden-area-t/reg-orden-area-t.component';

@Component({
    selector: 'app-ordenes-trabajo-admin',
    templateUrl: './ordenes-trabajo-admin.component.html',
    styleUrls: ['./ordenes-trabajo-admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class OrdenesTrabajoAdminComponent implements OnDestroy
{
    columnas: ITablaColumnas[] =
        [
            {etiqueta: 'No. Orden', propiedad: 'noOrden', pipe: TiposPipe.numero},
            {etiqueta: 'Anomalia', propiedad: 'anomalia', columnaSpan: 2},
            {etiqueta: 'Departamento', propiedad: 'departamento', subPropiedad: 'nombre'},
            {etiqueta: 'Creada por', propiedad: 'creadaPor'},
            {etiqueta: 'Prioridad', propiedad: 'prioridad'},
            {etiqueta: 'Fecha orden', propiedad: 'fechaOrden', pipe: TiposPipe.fecha},
            {etiqueta: 'fecha Ejecucion', propiedad: 'fechaEjecucion', pipe: TiposPipe.fecha}
        ];

    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'info',
                color: 'primary',
                tooltip: 'Mostrar informacion detallada',
                icono: 'info',
            }
        ];
    estaCargando = false;
    detalleOrden: IOrdenTrabajo = null;
    subscripcion: Subscription = new Subscription();

    constructor(private _dialogRef: MatDialog, public _ordenesState: OrdenesTrabajoState, private _route: Router, private _rutaActiva: ActivatedRoute)
    {
    }

    ordenesEstatus(estatus: string): void
    {
        this.estaCargando = true;
        this.subscripcion.add(this._ordenesState.ordenesTrabEstatus('', estatus, true).pipe(tap(() =>
        {
            this.estaCargando = false;
        })).subscribe());
    }

    buscarPorNoOrden(value): void
    {

    }

    deptoSeleccionado(evento: string[]): void
    {
        this.estaCargando = true;
        this.subscripcion.add(this._ordenesState.ordenesPorDepto(evento.toString()).pipe(tap(() =>
        {
            this.estaCargando = false;
        })).subscribe());
    }

    buscarPorRango(evento: string[]): void
    {

    }

    crearOrdenTele(): void
    {
        this._dialogRef.open(RegOrdenTrabTeleComponent, {width: '40%'});
    }

    crearOrdenAreaT(): void
    {
        this._dialogRef.open(RegOrdenAreaTComponent, {width: '45%'});
    }

    datoSeleccionado(evento: IEventoAcciones): void
    {
        switch (evento.accion)
        {
            case 'info':
                this.detalleOrden = evento.datos as IOrdenTrabajo;
                break;
            case 'rest':
                break;
        }
        // this._route.navigate(['../ordenes-tele/', evento.datos._id], {relativeTo: this._rutaActiva}).then();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
