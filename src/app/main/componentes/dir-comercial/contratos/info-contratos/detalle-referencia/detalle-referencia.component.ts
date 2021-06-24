import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClienteState} from '@dir-comercial/cliente.state';
import {Subscription} from 'rxjs';
import {ICliente} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-detalle-referencia',
    templateUrl: './detalle-referencia.component.html',
    styleUrls: ['./detalle-referencia.component.scss']
})
export class DetalleReferenciaComponent
{
    sub: Subscription = new Subscription();
    referencia: ICliente;

    constructor(public _clienteState: ClienteState)
    {
    }
}
