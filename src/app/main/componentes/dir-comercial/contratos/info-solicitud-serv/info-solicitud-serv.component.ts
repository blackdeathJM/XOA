import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ClienteState} from '@dir-comercial/cliente.state';
import {Observable, Subscription} from 'rxjs';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {fuseAnimations} from '@plantilla/animations';
import {Portal, PuentePortalService} from '@services/puente-portal.service';

@Component({
    selector: 'app-info-solicitud-serv',
    templateUrl: './info-solicitud-serv.component.html',
    styleUrls: ['./info-solicitud-serv.component.scss'],
    animations: [fuseAnimations]
})
export class InfoSolicitudServComponent implements OnDestroy, OnInit
{
    detalleSolicitud: ISolicitudServ;
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
    portal$: Observable<Portal>;

    constructor(public _solicitudPrev: SolicitudesState, public _clienteState: ClienteState, public _portal: PuentePortalService)
    {
    }

    ngOnInit(): void
    {
        this.portal$ = this._portal.gPortal;
    }

    clienteSelec(evento: IEventoAcciones): void
    {
        const datos = evento.datos as ISolicitudServ;
        switch (evento.accion)
        {
            case 'info':
                this.detalleSolicitud = datos;
                if (datos.medidorRef)
                {
                    this.subscripcion.add(this._clienteState.datosRef(datos.medidorRef).subscribe());
                }
                break;
            case 'reset':
                this.detalleSolicitud = null;
                break;
        }
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
