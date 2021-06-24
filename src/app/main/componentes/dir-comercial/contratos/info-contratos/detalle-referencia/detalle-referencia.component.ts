import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClienteState} from '@dir-comercial/cliente.state';
import {Subscription} from 'rxjs';
import {ICliente} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-detalle-referencia',
    templateUrl: './detalle-referencia.component.html',
    styleUrls: ['./detalle-referencia.component.scss']
})
export class DetalleReferenciaComponent implements OnInit, OnDestroy
{
    @Input() set noMedidor(v: string)
    {
        this._noMedidor = v;
    }

    _noMedidor: string;
    sub: Subscription = new Subscription();
    referencia: ICliente;

    constructor(private _clienteState: ClienteState)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this._clienteState.state$.subscribe());
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
