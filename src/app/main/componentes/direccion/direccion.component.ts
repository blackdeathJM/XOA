import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-direccion',
    templateUrl: './direccion.component.html',
    styleUrls: ['./direccion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DireccionComponent
{
}
