import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {PuentePortalService} from '@services/puente-portal.service';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import Jspdf from 'jspdf';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {MatDialog} from '@angular/material/dialog';
import {ActualizarSolicitudServComponent} from '@dir-comercial/reg-solicitud-serv/actualizar-solicitud-serv/actualizar-solicitud-serv.component';
import {IModalInfo} from '@funcionesRaiz/modal.interface';

@Component({
    selector: 'app-detalles-solicitud-serv',
    templateUrl: './detalles-solicitud-serv.component.html',
    styleUrls: ['./detalles-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class DetallesSolicitudServComponent
{
    @Input() visible = false;

    constructor(private _puentePortal: PuentePortalService, public _solicitudServ: SolicitudesState, private _dr: MatDialog)
    {

    }

    generarPagoServ(solicitudServ: ISolicitudServ): void
    {
        const pdf = new Jspdf({orientation: 'l'});
        pdf.text('Solicitud de verificacion de servicios de agua o drenaje', 10, 20);
        pdf.f2(5);
        pdf.line(10, 21, 100, 21);
        pdf.save();
        pdf.autoPrint();
    }

    imprimirOrdenServ(solicitudServ: ISolicitudServ): void
    {

    }

    actualizarOrden(solicitudServ: ISolicitudServ): void
    {
        const data: IModalInfo =
            {
                esReg: false,
                datos: solicitudServ
            };
        this._dr.open(ActualizarSolicitudServComponent, {width: '45%', data});
    }

    generarContrato(solicitudServ: any): void
    {

    }
}
