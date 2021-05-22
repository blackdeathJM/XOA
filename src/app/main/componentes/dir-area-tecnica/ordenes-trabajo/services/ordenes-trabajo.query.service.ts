import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ordenesPorDepto, ordenesTrabEstatus, todasOrdenes} from '../graphql/ordenes-trabajo.query';
import {IResOrdenTrabajo} from '../models/ordenes-trabajo';

@Injectable({
    providedIn: 'root'
})
export class OrdenesTrabajoQueryService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    todasOrdenes(): Observable<IResOrdenTrabajo>
    {
        return this.query(todasOrdenes, {}, {}, ['data', 'todasOrdenes']);
    }

    ordenesTrabEstatus(departamentoId: string, estatus: string, esAdmin: boolean): Observable<IResOrdenTrabajo>
    {
        return this.consulta(ordenesTrabEstatus, {departamentoId, estatus, esAdmin}, {}, ['data', 'ordenesTrabEstatus']);
    }

    ordenesPorDepto(departamentoId: string): Observable<IResOrdenTrabajo>
    {
        return this.consulta(ordenesPorDepto, {departamentoId}, {}, ['data', 'ordenesPorDepto']);
    }
}
