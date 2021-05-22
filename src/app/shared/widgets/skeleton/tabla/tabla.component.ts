import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-lista-cargando',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaComponent
{
    @Input() tieneDatos = true;
}
