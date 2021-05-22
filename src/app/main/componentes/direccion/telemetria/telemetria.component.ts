import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {TelemetriaState} from '@telemetria/telemetriaState';
import { OrdenesTrabajoState } from '../../dir-area-tecnica/ordenes-trabajo/state/ordenes-trabajo.state';

@Component({
    selector: 'app-telemetria',
    templateUrl: './telemetria.component.html',
    styleUrls: ['./telemetria.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelemetriaComponent implements OnInit, OnDestroy
{
    subscripcion: Subscription = new Subscription();

    constructor(private _teleState: TelemetriaState, private _ordenesTeleState: OrdenesTrabajoState)
    {
    }

    ngOnInit(): void
    {
        // this.subscripcion.add(forkJoin([this._teleState.listaInst(), this._ordenesTeleState.todasOrdenes()]).subscribe());
        this.subscripcion.add(this._teleState.listaInst().subscribe());
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
