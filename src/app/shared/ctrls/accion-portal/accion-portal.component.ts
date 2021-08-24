import {Component, OnInit} from '@angular/core';
import {Portal, PuentePortalService} from '@services/puente-portal.service';

@Component({
    selector: 'app-accion-portal',
    templateUrl: './accion-portal.component.html',
    styleUrls: ['./accion-portal.component.scss']
})
export class AccionPortalComponent implements OnInit
{
    respusta: Portal;

    constructor(public _portal: PuentePortalService)
    {
    }

    ngOnInit(): void
    {
        this._portal.gPortal.subscribe(res => this.respusta = res);
    }

}

