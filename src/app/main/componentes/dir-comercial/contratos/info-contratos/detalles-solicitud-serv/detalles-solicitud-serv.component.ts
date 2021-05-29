import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-detalles-solicitud-serv',
    templateUrl: './detalles-solicitud-serv.component.html',
    styleUrls: ['./detalles-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class DetallesSolicitudServComponent
{
    constructor()
    {
    }
}
