import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {IOrdenTrabajo} from '../../../models/ordenes-trabajo';

@Component({
    selector: 'app-detalles-orden-gral',
    templateUrl: './detalles-orden-gral.component.html',
    styleUrls: ['./detalles-orden-gral.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetallesOrdenGralComponent
{
    @Input() set ordenTrabajo(v: IOrdenTrabajo)
    {
        this._ordenTrabajo = v;
    }

    _ordenTrabajo: IOrdenTrabajo;
}
