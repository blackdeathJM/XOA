import {Component, ViewEncapsulation} from '@angular/core';
import {ClientesState} from '@dir-comercial/clientes.state';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';

@Component({
    selector: 'app-popover-buscar-cliente-tabla',
    templateUrl: './popover-buscar-cliente-tabla.component.html',
    styleUrls: ['./popover-buscar-cliente-tabla.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PopoverBuscarClienteTablaComponent
{
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'No. Contrato',
                propiedad: 'noContrato'
            },
            {
                etiqueta: 'No. Medidor',
                propiedad: 'noMedidor'
            },
            {
                etiqueta: 'No. Cuenta',
                propiedad: 'noCuenta'
            },
            {
                etiqueta: 'Calle',
                propiedad: 'calle',
            },
            {
                etiqueta: 'Colonia',
                propiedad: 'colonia',
            },
            {
                etiqueta: 'Entre calles',
                propiedad: 'entreCalles',
                columnaSpan: 2
            },
            {
                etiqueta: 'Referencia',
                propiedad: 'referencia'
            }
        ];
    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'info',
                icono: 'info',
                color: 'primary',
                tooltip: 'Mostrar detalles'
            }
        ];

    constructor(public _clientesState: ClientesState)
    {
    }

    cli(contratos: any): void
    {
        console.log('Contratos', contratos);
    }
}
