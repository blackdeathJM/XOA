import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {IOrdenTelemetria} from '../../../models/ordenes-trabajo';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-detalles-orden-telemetria',
    templateUrl: './detalles-orden-telemetria.component.html',
    styleUrls: ['./detalles-orden-telemetria.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetallesOrdenTelemetriaComponent
{
    @Input() set ordenTelemetria(v: IOrdenTelemetria)
    {
        this._ordenTelemetria = v;
    }
    _ordenTelemetria: IOrdenTelemetria = null;
}
