import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {IContrato} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-detalle-contrato',
    templateUrl: './detalle-contrato.component.html',
    styleUrls: ['./detalle-contrato.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleContratoComponent
{
    @Input() set detalleContrato(v: IContrato)
    {
        this._detalleContrato = v;
    }

    _detalleContrato: IContrato;
}
