import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegClienteComponent} from '@dir-comercial/reg-cliente/reg-cliente.component';
import {IClienteMod} from '@dir-comercial/cliente.interface';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '@env/environment';

@Component({
    selector: 'app-contratos',
    templateUrl: './contratos.component.html',
    styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit
{
    constructor(private _dialogRef: MatDialog)
    {
    }

    ngOnInit(): void
    {
        (mapboxgl as any).accessToken = environment.mapBoxToken;
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
