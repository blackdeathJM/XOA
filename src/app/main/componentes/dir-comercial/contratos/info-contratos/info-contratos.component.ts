import {Component, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {MatDialog} from '@angular/material/dialog';
import {RegContratosComponent} from '../reg-contratos/reg-contratos.component';
import {ClientesState} from '../../state/clientes.state';
import {finalize} from 'rxjs/operators';
import {ICliente, IClienteMod} from '@dir-comercial/cliente.interface';

enum AccionesTabla
{
    nvoContrato = 'nvoContrato',
    info = 'info',
    rest = 'rest'
}

@Component({
    selector: 'app-info-contratos',
    templateUrl: './info-contratos.component.html',
    styleUrls: ['./info-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InfoContratosComponent
{
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Folio',
                propiedad: 'folio',
                pipe: TiposPipe.numero,
                color: 'yellow-fg'
            },
            {
                etiqueta: 'RPU',
                propiedad: 'rpu',
            },
            {
                etiqueta: 'RFC',
                propiedad: 'rfc'
            },
            {
                etiqueta: 'Nombre',
                propiedad: 'nombre'
            },
            {
                etiqueta: 'Apellidos',
                propiedad: 'apellidos'
            }
        ];
    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: AccionesTabla.info,
                color: 'primary',
                tooltip: 'Mostrar informacion detallada del o los contratos de este usuario',
                icono: 'info'
            },
            {
                accion: AccionesTabla.nvoContrato,
                color: 'primary',
                tooltip: 'Crear nuevo contrato para este usuario',
                claseColor: 'light-blue-200-fg',
                icono: 'add_circle_outline'
            }
        ];
    skeleton = false;

    constructor(private _dialogRef: MatDialog, public _clientesState: ClientesState)
    {
    }

    buscarProCriterios(criterio: string): void
    {
        this.skeleton = true;
        this._clientesState.clientesPorCriterio(criterio).pipe(finalize(() => this.skeleton = false)).subscribe();
    }

    clienteSeleccionado(evento: IEventoAcciones): void
    {
        switch (evento.accion)
        {
            case AccionesTabla.nvoContrato:
                const data: IClienteMod =
                    {
                        esRegistro: true,
                        datosCliente: evento.datos as ICliente
                    };
                this._dialogRef.open(RegContratosComponent, {width: 'auto', data});
                break;
            case AccionesTabla.info:
                break;
            case AccionesTabla.rest:
                break;
        }
    }
}
