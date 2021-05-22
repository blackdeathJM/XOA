import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegClienteComponent} from '@dir-comercial/reg-cliente/reg-cliente.component';
import {IClienteMod} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-contratos',
    templateUrl: './contratos.component.html',
    styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent
{
    constructor(private _dialogRef: MatDialog)
    {
    }

    regUsuario(): void
    {
        const data: IClienteMod =
            {
                esRegistro: true,
                datosCliente: null
            };

        this._dialogRef.open(RegClienteComponent, {width: '40%', data});
    }
}
