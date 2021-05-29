import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {PuentePortalService} from '@services/puente-portal.service';

@Component({
    selector: 'app-potal-contenedor',
    templateUrl: './potal-contenedor.component.html',
    styleUrls: ['./potal-contenedor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotalContenedorComponent
{
    constructor(public _portal: PuentePortalService)
    {
    }
}
