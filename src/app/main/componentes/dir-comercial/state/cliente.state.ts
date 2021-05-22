import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {ICliente, IResCliente} from '../models/cliente.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {Observable} from 'rxjs';
import {ClienteMutationService} from '../services/cliente.mutation.service';
import {tap} from 'rxjs/operators';

@StateRepository()
@State<ICliente>({name: 'Cliente', defaults: null})
@Injectable()
export class ClienteState extends NgxsDataRepository<ICliente>
{
    constructor(private _cliente: ClienteMutationService)
    {
        super();
    }

    @DataAction() regCliente(@Payload('Registrar cliente') cliente: ICliente): Observable<IResCliente>
    {
        return this._cliente.regCliente(cliente).pipe(tap((cli: IResCliente) =>
        {
            this.ctx.setState(cli.documento);
        }));
    }
}
