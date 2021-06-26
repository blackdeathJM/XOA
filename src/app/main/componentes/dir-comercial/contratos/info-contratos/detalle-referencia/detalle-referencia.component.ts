import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICliente} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-detalle-referencia',
    templateUrl: './detalle-referencia.component.html',
    styleUrls: ['./detalle-referencia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleReferenciaComponent
{
    @Input() set infoReferencia(v: ICliente)
    {
        this._infoReferencia = v;
    }

    _infoReferencia: ICliente = null;
}
