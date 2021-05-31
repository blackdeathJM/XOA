import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {fuseAnimations} from '@plantilla/animations';
import {PuentePortalService} from '@services/puente-portal.service';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';

@Component({
    selector: 'app-detalles-solicitud-serv',
    templateUrl: './detalles-solicitud-serv.component.html',
    styleUrls: ['./detalles-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class DetallesSolicitudServComponent implements OnInit, OnDestroy
{

    @ViewChild(CdkPortal, {static: true}) contenedorPortal: CdkPortal;

    constructor(private _puentePortal: PuentePortalService, public _solicitudServ: SolicitudesState)
    {

    }

    ngOnInit(): void
    {
        setTimeout(() => this._puentePortal.setPortal(this.contenedorPortal), 100);
    }

    ngOnDestroy(): void
    {
        // this.contenedorPortal.detach();
    }
}
