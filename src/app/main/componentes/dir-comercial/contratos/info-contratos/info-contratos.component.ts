import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-info-contratos',
    templateUrl: './info-contratos.component.html',
    styleUrls: ['./info-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoContratosComponent
{
}
