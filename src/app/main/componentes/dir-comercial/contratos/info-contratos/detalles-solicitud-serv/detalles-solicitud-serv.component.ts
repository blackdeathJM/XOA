import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {fuseAnimations} from '@plantilla/animations';
import {PuentePortalService} from '@services/puente-portal.service';

@Component({
    selector: 'app-detalles-solicitud-serv',
    templateUrl: './detalles-solicitud-serv.component.html',
    styleUrls: ['./detalles-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class DetallesSolicitudServComponent implements OnInit, OnDestroy
{
    @ViewChild(CdkPortal, {static: true}) contenedorPortal: CdkPortal;

    constructor(private _puentePortal: PuentePortalService)
    {
    }

    ngOnInit(): void
    {
        this._puentePortal.setPortal(this.contenedorPortal);
    }

    ngOnDestroy(): void
    {
        this.contenedorPortal.detach();
    }
}
