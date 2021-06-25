import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {ICliente, IResCliente} from '../models/cliente.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {BehaviorSubject, Observable} from 'rxjs';
import {ClienteMutationService} from '../services/cliente.mutation.service';
import {tap} from 'rxjs/operators';
import {ClienteQueryService} from '@dir-comercial/cliente.query.service';

@StateRepository()
@State<ICliente>({name: 'Cliente', defaults: null})
@Injectable()
export class ClienteState extends NgxsDataRepository<ICliente>
{
    private clienteDetalle$: BehaviorSubject<ICliente> = new BehaviorSubject(null);

    constructor(private _clienteMutation: ClienteMutationService, private _clienteQuery: ClienteQueryService)
    {
        super();
    }

    get gClienteDetalle(): Observable<ICliente>
    {
        return this.clienteDetalle$.asObservable();
    }

    set sClienteDetalle(datos: ICliente)
    {
        this.clienteDetalle$.next(datos);
    }

    @DataAction() regCliente(@Payload('Registrar cliente') cliente: ICliente): Observable<IResCliente>
    {
        return this._clienteMutation.regCliente(cliente).pipe(tap((cli: IResCliente) =>
        {
            this.ctx.setState(cli.documento);
        }));
    }

    @DataAction() datosRef(@Payload('Buscar medidor ref') noMedidor: string): Observable<IResCliente>
    {
        if (noMedidor)
        {
            return this._clienteQuery.datosRef(noMedidor).pipe(tap((res: IResCliente) =>
            {
                if (res.estatus)
                {
                    this.ctx.setState(res.documento);
                }
            }));
        }
    }
}
