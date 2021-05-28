import {Component} from '@angular/core';
import {ClientesState} from '@dir-comercial/clientes.state';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {MatDialog} from '@angular/material/dialog';
import {RegSolicitudServComponent} from '@dir-comercial/reg-solicitud-serv/reg-solicitud-serv.component';
import {IModalInfo} from '@funcionesRaiz/modal.interface';
import {ICliente} from '@dir-comercial/cliente.interface';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';

enum AccionesTabla
{
    info = 'info',
    rest = 'rest'
}

@Component({
    selector: 'app-consulta-contratos',
    templateUrl: './consulta-contratos.component.html',
    styleUrls: ['./consulta-contratos.component.scss']
})
export class ConsultaContratosComponent
{

    constructor(private _dialogRef: MatDialog, public _clientesState: ClientesState, public _solicitudServState: SolicitudesState)
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

    nvaSolicitudServAgua(cliente: ICliente): void
    {
        const data: IModalInfo =
            {
                esReg: true,
                datos: cliente
            };

        this._dialogRef.open(RegSolicitudServComponent, {width: '45%', data});
    }

    verSolicitudesCreadas(cliente: ICliente): void
    {
        this._solicitudServState.solPorCliente(cliente._id).subscribe();
    }
}
