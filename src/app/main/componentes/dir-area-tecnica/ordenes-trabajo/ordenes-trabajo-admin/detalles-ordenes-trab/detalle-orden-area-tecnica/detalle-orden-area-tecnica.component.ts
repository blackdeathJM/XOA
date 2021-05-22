import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {IOrdenAreaTecnica} from '../../../models/ordenes-trabajo';

@Component({
    selector: 'app-detalle-orden-area-tecnica',
    templateUrl: './detalle-orden-area-tecnica.component.html',
    styleUrls: ['./detalle-orden-area-tecnica.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleOrdenAreaTecnicaComponent
{
    @Input() set ordenAreaTecnica(v: IOrdenAreaTecnica)
    {
        this._ordenAreaTecnica = v;
    }
    _ordenAreaTecnica: IOrdenAreaTecnica = null;
}
