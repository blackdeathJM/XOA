import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ClientesState} from '@dir-comercial/clientes.state';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-buscar-cliente-autocomplete',
    templateUrl: './buscar-cliente-autocomplete.component.html',
    styleUrls: ['./buscar-cliente-autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscarClienteAutocompleteComponent implements OnInit, OnDestroy
{
    @Output() clienteSeleccionado: EventEmitter<[ICliente, IContrato]> = new EventEmitter();

    buscarCliente = new FormControl();
    subscripcion: Subscription = new Subscription();

    constructor(public _clientesState: ClientesState)
    {
    }

    ngOnInit(): void
    {
        this.subscripcion.add(this.buscarCliente.valueChanges.pipe(debounceTime(300),
            switchMap((v: string) => this._clientesState.clientesPorCriterio(v))).subscribe());
    }

    clienteSelec(cliente: ICliente, contrato: IContrato): void
    {
        this.clienteSeleccionado.emit([cliente, contrato]);
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
