import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SesionState} from '@usuarios/state/sesion.state';
import {RegOrdenTrabTeleComponent} from 'app/main/componentes/dir-area-tecnica/ordenes-trabajo/ordenes-trabajo-admin/registros/reg-orden-trab-tele/reg-orden-trab-tele.component';

@Component({
    selector: 'app-ordenes-trab-tele',
    templateUrl: './ordenes-trab-tele.component.html',
    styleUrls: ['./ordenes-trab-tele.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesTrabTeleComponent
{
    constructor(private _dialogRef: MatDialog, public _sesionState: SesionState)
    {
    }

    nuevaOrden(): void
    {
        this._dialogRef.open(RegOrdenTrabTeleComponent, {width: '45%'});
    }
}
