import {Injectable} from '@angular/core';
import {ComponentPortal, DomPortal, TemplatePortal} from '@angular/cdk/portal';
import {Subject} from 'rxjs';

export type Portal = TemplatePortal | ComponentPortal<any> | DomPortal;

@Injectable({
    providedIn: 'root'
})
export class PuentePortalService
{
    private portalActivo = new Subject<Portal>();
    readonly portal$ = this.portalActivo.asObservable();

    setPortal(portal: Portal): void
    {
        this.portalActivo.next(portal);
    }
}
