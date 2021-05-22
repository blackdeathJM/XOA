import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {MatDialog} from '@angular/material/dialog';
import {RegMotorComponent} from '@telemetria/instalaciones/motores-bombas/reg-motor/reg-motor.component';
import {RegBombaComponent} from '@telemetria/instalaciones/motores-bombas/reg-bomba/reg-bomba.component';
import {IAccEquipo} from '@telemetria/equipo-electrico-interface';
import {TelemetriaState} from '@telemetria/telemetriaState';

@Component({
    selector: 'app-motores-bombas',
    templateUrl: './motores-bombas.component.html',
    styleUrls: ['./motores-bombas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MotoresBombasComponent
{
    constructor(public _instQuery: InstalacionQueryService, private _dialogRef: MatDialog, private _teleState: TelemetriaState)
    {
    }

    agMotor(_id: string): void
    {
        const data: IAccEquipo =
            {
                equipo: null,
                _id,
                nombreMutacion: 'regMotor'
            };

        this._dialogRef.open(RegMotorComponent, {width: 'auto', data});
    }

    agBomba(_id: string): void
    {
        const data: IAccEquipo =
            {
                equipo: null,
                _id,
                nombreMutacion: 'regBomba'
            };
        this._dialogRef.open(RegBombaComponent, {width: 'auto', data});
    }
}
