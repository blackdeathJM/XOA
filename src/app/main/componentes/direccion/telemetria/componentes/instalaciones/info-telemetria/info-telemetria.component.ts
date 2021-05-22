import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@plantilla/animations';
import { InstalacionQueryService } from '@telemetria/query/instalacion-query.service';

@Component({
    selector: 'app-info-telemetria',
    templateUrl: './info-telemetria.component.html',
    styleUrls: ['./info-telemetria.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class InfoTelemetriaComponent
{
    constructor(public _instQuery: InstalacionQueryService) {}
}
