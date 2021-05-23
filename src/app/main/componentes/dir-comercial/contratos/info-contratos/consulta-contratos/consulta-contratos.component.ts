import {Component} from '@angular/core';
import {WIDGET} from '@Config/widget.token';
import {IWidget} from '@Config/widget.interface';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';

@Component({
    selector: 'app-consulta-contratos',
    templateUrl: './consulta-contratos.component.html',
    styleUrls: ['./consulta-contratos.component.scss'],
    providers: [{provide: WIDGET, useExisting: ConsultaContratosComponent}]
})
export class ConsultaContratosComponent implements IWidget
{

    constructor()
    {
    }
    datos: [ICliente, IContrato] = [null, null];
    estaCargando: boolean;
    tieneDatos: boolean;
}
