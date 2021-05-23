import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {MatDialog} from '@angular/material/dialog';
import {ClientesState} from '../../state/clientes.state';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

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
export class InfoContratosComponent implements OnInit, OnDestroy
{
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Nombre completo',
                propiedad: 'nombreCompleto'
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
    subscripcion: Subscription = new Subscription();

    buscarCliente = new FormControl('');

    constructor(private _dialogRef: MatDialog, public _clientesState: ClientesState)
    {
    }

    ngOnInit(): void
    {
        // this.subscripcion.add(this.buscarCliente.valueChanges.pipe(debounceTime(500),
        //     switchMap((v: string) => this._clientesState.clientesPorCriterio(v))).subscribe());
    }

    buscarProCriterios(criterio: string): void
    {
        // this.skeleton = true;
        // this._clientesState.clientesPorCriterio(criterio).pipe(finalize(() => this.skeleton = false)).subscribe();
    }

    // clienteSeleccionado(evento: IEventoAcciones): void
    // {
    //     switch (evento.accion)
    //     {
    //         case AccionesTabla.nvoContrato:
    //             const data: IClienteMod =
    //                 {
    //                     esRegistro: true,
    //                     datosCliente: evento.datos as ICliente
    //                 };
    //             this._dialogRef.open(RegContratosComponent, {width: 'auto', data});
    //             break;
    //         case AccionesTabla.info:
    //             break;
    //         case AccionesTabla.rest:
    //             break;
    //     }
    // }
    clienteEmitido(evento: [ICliente, IContrato]): void
    {
        console.log('Evento', evento);
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
