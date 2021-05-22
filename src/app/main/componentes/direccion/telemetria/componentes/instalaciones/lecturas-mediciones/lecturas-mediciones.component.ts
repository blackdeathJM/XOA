import {Component, ViewEncapsulation} from '@angular/core';
import {RegMedicionComponent} from '@telemetria/instalaciones/lecturas-mediciones/reg-medicion/reg-medicion.component';
import {MatDialog} from '@angular/material/dialog';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {fuseAnimations} from '@plantilla/animations';
import {eTiposLect, IParamsMediciones} from '@telemetria/lecturas-interface';

@Component({
    selector: 'app-lecturas-mediciones',
    templateUrl: './lecturas-mediciones.component.html',
    styleUrls: ['./lecturas-mediciones.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class LecturasMedicionesComponent
{
    tiposLect = eTiposLect;
    constructor(private _dialogRef: MatDialog, public _instSelec: InstalacionQueryService)
    {
    }

    regLecturas(_id: string, tipoLect: string, longMax= {}, sufijo: string): void
    {
        const data: IParamsMediciones =
            {
                _id,
                valorMax: longMax,
                sufijo,
                tipoLect,
                esAgregar: true,
                datos: null
            };
        this._dialogRef.open(RegMedicionComponent, {width: '25%', data, hasBackdrop: false});
    }
}
