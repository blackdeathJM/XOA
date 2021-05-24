import {Component} from '@angular/core';
import {WIDGET} from '@Config/widget.token';
import {IWidget} from '@Config/widget.interface';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';
import {ClientesState} from '@dir-comercial/clientes.state';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';

enum AccionesTabla
{
    info = 'info',
    rest = 'rest'
}

@Component({
    selector: 'app-consulta-contratos',
    templateUrl: './consulta-contratos.component.html',
    styleUrls: ['./consulta-contratos.component.scss'],
    providers: [{provide: WIDGET, useExisting: ConsultaContratosComponent}]
})
export class ConsultaContratosComponent implements IWidget
{

    constructor(public _clientesState: ClientesState)
    {
    }

    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'rpu',
                propiedad: 'rpu'
            },
            {
                etiqueta: 'No. Medidor',
                propiedad: 'noMedidor'
            },
            {
                etiqueta: 'No. Contrato',
                propiedad: 'noContrato'
            },
            {
                etiqueta: 'No. Cuenta',
                propiedad: 'noCuenta'
            },
            {
                etiqueta: 'Calle',
                propiedad: 'calle'
            },
            {
                etiqueta: 'Colonia',
                propiedad: 'colonia'
            },
            {
                etiqueta: 'Ruta',
                propiedad: 'ruta'
            },
            {
                etiqueta: 'Tarifa',
                propiedad: 'tarifa'
            },
            {
                etiqueta: 'Giro',
                propiedad: 'giro'
            }
        ];

    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: AccionesTabla.info,
                icono: 'info',
                color: 'primary',
                tooltip: 'Mostrar informacion detallada del o los contratos de este usuario'
            }
        ];
    datos: [ICliente, IContrato] = [null, null];
    estaCargando: boolean;
    tieneDatos: boolean;
}
