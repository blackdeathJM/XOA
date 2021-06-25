import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClienteState} from '@dir-comercial/cliente.state';

@Component({
    selector: 'app-detalle-referencia',
    templateUrl: './detalle-referencia.component.html',
    styleUrls: ['./detalle-referencia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleReferenciaComponent
{
    constructor(public _clienteState: ClienteState)
    {
    }
}
