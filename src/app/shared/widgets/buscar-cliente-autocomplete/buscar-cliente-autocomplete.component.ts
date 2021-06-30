import {ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ClientesState} from '@dir-comercial/clientes.state';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';
import {Subscription} from 'rxjs';
import {WIDGET} from '@Config/widget.token';
import {IWidget} from '@Config/widget.interface';

@Component({
    selector: 'app-buscar-cliente-autocomplete',
    templateUrl: './buscar-cliente-autocomplete.component.html',
    styleUrls: ['./buscar-cliente-autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscarClienteAutocompleteComponent implements OnInit, OnDestroy
{
    @Input() tipoConsulta: 'multiple' | 'autoCompletado' | 'normal';
    @ContentChild(WIDGET as any, {static: true}) clientes: IWidget;

    marcador = 'Buscar cliente por: (NOMBRE COMPLETO - TELEFONO)';

    buscarCliente = new FormControl('');
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
        this.clientes.datos = [cliente, contrato];
        // this.clienteSeleccionado.emit([cliente, contrato]);
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
