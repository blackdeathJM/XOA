import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {IResInstalacion} from '@telemetria/respuesta-interface';
import {Apollo} from 'apollo-angular';
import {todasInstalaciones} from '@telemetria/query/instalacion-query';

@Injectable({
    providedIn: 'root'
})
export class InstalacionQueryService extends ApiService
{
    camInstalacion = new BehaviorSubject<IInstalacion>(null);
    camInstalacion$ = this.camInstalacion.asObservable();

    constructor(public apollo: Apollo)
    {
        super(apollo);
    }

    cambioInstalcion(instalacion: IInstalacion): void
    {
        return this.camInstalacion.next(instalacion);
    }

    todasInstalaciones(): Observable<IResInstalacion>
    {
        return this.query(todasInstalaciones, {}, {}, ['data', 'todasInstalaciones']);
    }
}
