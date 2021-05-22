import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import orgInfo from 'assets/organismo/organismo.json';

@Component({
    selector: 'app-impresion',
    templateUrl: './impresion.component.html',
    styleUrls: ['./impresion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpresionComponent
{
    organismoInfo = orgInfo;
    fecha: Date = new Date();
}
