import {Component, ViewEncapsulation} from '@angular/core';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {fuseAnimations} from '@plantilla/animations';
import {IParamsCtrls} from '@telemetria/parametros-electricos-interface';
import {MatDialog} from '@angular/material/dialog';
import {RegLecturaComponent} from '@telemetria/instalaciones/lecturas-parametros/reg-lectura/reg-lectura.component';

@Component({
    selector: 'app-lecturas-parametros',
    templateUrl: './lecturas-parametros.component.html',
    styleUrls: ['./lecturas-parametros.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class LecturasParametrosComponent
{
    voltaje = 'voltajes';
    amperaje = 'amperajes';
    fc = 'factorPotencia';
    kw = 'kilowatts';

    constructor(public _instSelec: InstalacionQueryService, private _dialogRef: MatDialog)
    {
    }

    regParam(_id: string, esAgregar: boolean, param: string, sufijo: string, fechaVisible: boolean, longitudMaxima: { value: number }): void
    {
        const data: IParamsCtrls =
            {
                _id,
                esAgregar,
                param,
                sufijo,
                fechaVisible,
                titulo: param,
                longMax: longitudMaxima
            };
        this._dialogRef.open(RegLecturaComponent, {width: 'auto', data, hasBackdrop: false});
    }
}
