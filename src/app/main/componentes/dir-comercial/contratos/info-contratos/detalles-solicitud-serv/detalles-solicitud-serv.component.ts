import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {PuentePortalService} from '@services/puente-portal.service';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import Jspdf from 'jspdf';

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

    // @ViewChild(CdkPortal, {static: true}) contenedorPortal: CdkPortal;

    constructor(private _puentePortal: PuentePortalService, public _solicitudServ: SolicitudesState)
    {

    }

    // ngOnInit(): void
    // {
    //     setTimeout(() => this._puentePortal.setPortal(this.contenedorPortal), 100);
    // }

    // ngOnDestroy(): void
    // {
    //     // this.contenedorPortal.detach();
    // }
    generarPagoServ(solicitudServ: any): void
    {
        const pdf = new Jspdf({orientation: 'l'});
        pdf.text('Solicitud de verificacion de servicios de agua o drenaje', 10, 20);
        pdf.f2(5);
        pdf.line(10, 21, 100, 21);
        pdf.save();
        pdf.autoPrint();
    }

    imprimirOrdenServ(solicitudServ: any): void
    {

    }

    actualizarOrden(solicitudServ: any): void
    {

    }

    generarContrato(solicitudServ: any): void
    {

    }
}
