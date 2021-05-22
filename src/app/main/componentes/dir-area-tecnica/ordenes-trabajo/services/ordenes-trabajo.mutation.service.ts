import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {regOrdenTrabajo} from '../graphql/ordenes-trabajo.mutation';
import {IOrdenTrabajo, IResOrdenTrabajo} from '../models/ordenes-trabajo';

@Injectable({
    providedIn: 'root'
})
export class OrdenesTrabajoMutationService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    regOrdenTrabajo(ordenTrabajo: IOrdenTrabajo): Observable<IResOrdenTrabajo>
    {
        return this.mutation(regOrdenTrabajo, {ordenTrabajo}, {}, ['data', 'regOrdenTrabajo']);
    }
}
