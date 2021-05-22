import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-card-bootstrap',
    templateUrl: './card-bootstrap.component.html',
    styleUrls: ['./card-bootstrap.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBootstrapComponent
{
}
