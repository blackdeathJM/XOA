import {Component, ViewEncapsulation} from '@angular/core';
import {NotificarState} from '@global/state/notificar.state';
import {INotificacion} from '@global/models/notificacion.interface';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent
{
    constructor(public _notState: NotificarState)
    {
    }

    eliminarNot(notificacion: INotificacion): void
    {
        this._notState.eliminarNotificacion(notificacion._id).subscribe();
    }
}
