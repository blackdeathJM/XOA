import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {regCliente, regContrato} from '../graphql/mutations/cliente.mutation';
import {ICliente, IContrato, IResCliente} from '../models/cliente.interface';

@Injectable({
    providedIn: 'root'
})
export class ClienteMutationService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    regCliente(cliente: ICliente): Observable<IResCliente>
    {
        return this.mutation(regCliente, {cliente}, {}, ['data', 'regCliente']);
    }

    regContrato(idCliente: string, contrato: IContrato): Observable<IResCliente>
    {
        return this.mutation(regContrato, {idCliente, contrato}, {}, ['data', 'regContrato']);
    }
}
