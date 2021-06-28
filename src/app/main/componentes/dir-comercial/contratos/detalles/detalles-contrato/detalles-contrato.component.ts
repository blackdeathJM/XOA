import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IContrato} from '@dir-comercial/cliente.interface';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-detalles-contrato',
    templateUrl: './detalles-contrato.component.html',
    styleUrls: ['./detalles-contrato.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class DetallesContratoComponent
{
    @Input() set infoContrato(v: IContrato)
    {
        this._infoContrato = v;
    }

    _infoContrato: IContrato = null;
}
