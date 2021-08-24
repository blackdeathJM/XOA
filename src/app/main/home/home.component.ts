import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GralesServices} from '@services/grales.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent
{
    opcionesCarga = GralesServices.opcCargaImg('pre');

    listaArchivos($event: string[]): void
    {
        console.log('imagen', $event);
    }
}
