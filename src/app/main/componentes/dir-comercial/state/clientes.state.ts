import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {ICliente, IContrato, IResCliente} from '../models/cliente.interface';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ClienteQueryService} from '../services/cliente.query.service';
import {tap} from 'rxjs/operators';
import {GralesServices} from '@services/grales.service';
import {ClienteMutationService} from '@dir-comercial/cliente.mutation.service';

@StateRepository()
@State<ICliente[]>({name: 'Clientes', defaults: []})
@Injectable()
export class ClientesState extends NgxsDataRepository<ICliente[]>
{
    constructor(private _clienteQuery: ClienteQueryService, private _clienteMutation: ClienteMutationService)
    {
        super();
    }

    @DataAction() clientesPorCriterio(@Payload('Buscar por criterio') criterio: string): Observable<IResCliente>
    {
        return this._clienteQuery.clientesPorCriterio(criterio).pipe(tap((clie: IResCliente) =>
        {
            this.ctx.setState(clie.documentos);
        }));
    }

    @DataAction() regContrato(@Payload('Reg contrato') idCliente: string, contrato: IContrato): Observable<IResCliente>
    {
        return this._clienteMutation.regContrato(idCliente, contrato).pipe(tap((cli: IResCliente) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(idCliente, this.ctx).concat(cli.documento));
        }));
    }
}
