import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {actualizarDepto, registroDepto} from '../graphql/mutations/fragDepartamento.mutations';
import {IDepartamento, IResDepto} from '../models/departamento.model';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeptoMutationService extends ApiService
{

    constructor(_apollo: Apollo) {super(_apollo); }

    registroDepto(departamento: IDepartamento): Observable<IResDepto>
    {
        return this.mutation(registroDepto, {departamento}, {}, ['data', 'registroDepto'], []);
    }

    actualizarDepto(departamento: IDepartamento): Observable<IResDepto>
    {
        return this.mutation(actualizarDepto, {departamento}, {}, ['data', 'actualizarDepto'], []);
    }
}
