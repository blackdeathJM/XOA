import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {OrdenesTrabajoMutationService} from '../services/ordenes-trabajo.mutation.service';
import {Observable} from 'rxjs';
import {OrdenesTrabajoQueryService} from '../services/ordenes-trabajo.query.service';
import {tap} from 'rxjs/operators';
import {IOrdenTrabajo, IResOrdenTrabajo} from '../models/ordenes-trabajo';

@StateRepository()
@State<IOrdenTrabajo[]>({name: 'Ordenes', defaults: []})
@Injectable()
export class OrdenesTrabajoState extends NgxsDataRepository<IOrdenTrabajo[]>
{
    constructor(private _ordenesMutation: OrdenesTrabajoMutationService, private _ordenesQuery: OrdenesTrabajoQueryService)
    {
        super();
    }

    @DataAction() regOrdenTrabajo(@Payload('reg ordenes tele') ordenTrabajo: IOrdenTrabajo): Observable<IResOrdenTrabajo>
    {
        return this._ordenesMutation.regOrdenTrabajo(ordenTrabajo).pipe(tap((res: IResOrdenTrabajo) =>
        {
            this.ctx.setState((state): IOrdenTrabajo[] => state.concat(res.documento));
        }));
    }

    @DataAction() ordenesTrabEstatus(@Payload('Todas las ordenes estatus') departamentoId: string, estatus: string, esAdmin: boolean): Observable<IResOrdenTrabajo>
    {
        return this._ordenesQuery.ordenesTrabEstatus(departamentoId, estatus, esAdmin).pipe(tap((res: IResOrdenTrabajo) =>
        {
            this.ctx.setState(res.documentos);
        }));
    }

    @DataAction() ordenesPorDepto(@Payload('Ordenes por departamento') departamentoId: string): Observable<IResOrdenTrabajo>
    {
        return this._ordenesQuery.ordenesPorDepto(departamentoId).pipe(tap((res: IResOrdenTrabajo) =>
        {
            this.ctx.setState(res.documentos);
        }));
    }

    public todasOrdenes(): Observable<IResOrdenTrabajo>
    {
        return this._ordenesQuery.todasOrdenes().pipe(tap((res: IResOrdenTrabajo) =>
        {
            if (res.estatus)
            {
                this.setState(res.documentos);
            }
        }));
    }
}
