import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {OrdenesTrabajoQueryService} from './services/ordenes-trabajo.query.service';
import {TelemetriaState} from '@telemetria/telemetriaState';

@Component({
    selector: 'app-ordenes-trabajo',
    templateUrl: './ordenes-trabajo.component.html',
    styleUrls: ['./ordenes-trabajo.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrdenesTrabajoComponent implements OnInit, OnDestroy
{
    subscripcion: Subscription = new Subscription();

    constructor(private _ordenesTrabajoState: OrdenesTrabajoQueryService, private _teleState: TelemetriaState)
    {
    }

    ngOnInit(): void
    {
        this.subscripcion.add(forkJoin([this._ordenesTrabajoState.todasOrdenes(), this._teleState.listaInst()]).subscribe());
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }

}
