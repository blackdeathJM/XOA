import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ClienteState} from '@dir-comercial/cliente.state';
import {Subscription} from 'rxjs';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-info-solicitud-serv',
    templateUrl: './info-solicitud-serv.component.html',
    styleUrls: ['./info-solicitud-serv.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class InfoSolicitudServComponent implements OnDestroy
{
    columnasSolicitud: ITablaColumnas[] =
        [
            {
                etiqueta: 'Calle',
                propiedad: 'calle'
            },
            {
                etiqueta: 'Colonia',
                propiedad: 'colonia'
            },
            {
                etiqueta: 'Entre calles',
                propiedad: 'entreCalles'
            },
            {
                etiqueta: 'Referencia',
                propiedad: 'referencia'
            },
            {
                etiqueta: 'Medidor ref',
                propiedad: 'medidorRef'
            }
        ];
    acciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'info',
                icono: 'info',
                color: 'primary',
                tooltip: 'Mostrar informacion de la solicitud de servicio',
            }
        ];
    subscripcion: Subscription = new Subscription();

    constructor(public _solicitudPrev: SolicitudesState, public _clienteState: ClienteState)
    {
    }

    clienteSelec(evento: IEventoAcciones): void
    {
        const datos = evento.datos as ISolicitudServ;
        switch (evento.accion)
        {
            case 'info':
                this._solicitudPrev.sSolicituServ = datos;
                this.subscripcion.add(this._clienteState.datosRef(datos.medidorRef).subscribe());
                break;
        }
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
