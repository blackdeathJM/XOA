import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';

@Component({
    selector: 'app-listar-instalaciones',
    templateUrl: './listar-instalaciones.component.html',
    styleUrls: ['./listar-instalaciones.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListarInstalacionesComponent
{
    constructor(public _instalacionState: TelemetriaState, private _instalacionQuery: InstalacionQueryService)
    {
    }

    elementoSeleccionado(instalacion: IInstalacion): void
    {
        this._instalacionQuery.cambioInstalcion(instalacion);
    }
}
