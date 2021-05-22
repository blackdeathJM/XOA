import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {fuseAnimations} from '@plantilla/animations';
import {MatDialog} from '@angular/material/dialog';
import {RegClienteComponent} from '../../contratos/reg-cliente/reg-cliente.component';
import {IClienteMod} from '../../models/cliente.interface';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ClientesState} from '@dir-comercial/clientes.state';

@Component({
    selector: 'app-padron-usuario',
    templateUrl: './padron-usuario.component.html',
    styleUrls: ['./padron-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class PadronUsuarioComponent implements OnInit
{
    txtBuscar: FormControl = new FormControl('');
    estaCargando = false;

    constructor(private _dialogRef: MatDialog, private _clientesState: ClientesState)
    {
    }

    nuevoCliente(): void
    {
        const data: IClienteMod = {esRegistro: true, datosCliente: null};
        this._dialogRef.open(RegClienteComponent, {width: '45%', data});
    }

    ngOnInit(): void
    {
        this.estaCargando = true;
        this.txtBuscar.valueChanges.pipe(debounceTime(300), switchMap((res: string) => this._clientesState.clientesPorCriterio(res)))
            .subscribe(() => this.estaCargando = false);
    }
}
