import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICliente} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-tarjeta-solicitud-serv',
    templateUrl: './tarjeta-solicitud-serv.component.html',
    styleUrls: ['./tarjeta-solicitud-serv.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TarjetaSolicitudServComponent
{
    @Input() clienteSelec: ICliente;

    constructor()
    {
    }
}
