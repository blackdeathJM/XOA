import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResCliente} from '../models/cliente.interface';
import {clientesPorCriterio} from '../graphql/query/cliente.query';

@Injectable({
    providedIn: 'root'
})
export class ClienteQueryService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    clientesPorCriterio(criterio: string): Observable<IResCliente>
    {
        return this.consulta(clientesPorCriterio, {criterio}, {}, ['data', 'clientesPorCriterio']);
    }
}

