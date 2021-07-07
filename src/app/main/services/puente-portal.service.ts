import {Injectable} from '@angular/core';
import {ComponentPortal, DomPortal, TemplatePortal} from '@angular/cdk/portal';
import {Observable, Subject} from 'rxjs';

export type Portal = TemplatePortal | ComponentPortal<any> | DomPortal;

@Injectable({
    providedIn: 'root'
})
export class PuentePortalService
{
    private portal$ = new Subject<Portal>();

    get gPortal(): Observable<Portal>
    {
        return this.portal$.asObservable();
    }

    set sPortal(portal: Portal)
    {
        this.portal$.next(portal);
    }
}
