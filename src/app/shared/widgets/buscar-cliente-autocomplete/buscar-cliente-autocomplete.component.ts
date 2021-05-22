import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ClientesState} from '@dir-comercial/clientes.state';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-buscar-cliente-autocomplete',
    templateUrl: './buscar-cliente-autocomplete.component.html',
    styleUrls: ['./buscar-cliente-autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscarClienteAutocompleteComponent implements OnInit
{
    @Output() clienteSeleccionado: EventEmitter<[ICliente, IContrato]> = new EventEmitter();
    formBuscarCliente: FormGroup = this._fb.group({
        criterio: []
    });

    constructor(private _fb: FormBuilder, public _clienteState: ClientesState)
    {
    }

    ngOnInit(): void
    {
        this.formBuscarCliente.get('criterio').valueChanges.pipe(debounceTime(300),
            switchMap((resp: string) => this._clienteState.clientesPorCriterio(resp))).subscribe((res) =>
        {
            console.log('respuesta', res);
        });
    }

    clienteSelec(cliente: ICliente, contrato: IContrato): void
    {
        this.clienteSeleccionado.emit([cliente, contrato]);
    }
}
