import {IDepartamento, IResDepto} from '@global/models/departamento.model';
import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DeptoQueryService} from '@global/services/depto-query.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DeptoMutationService} from '@global/services/depto-mutation.service';
import {GralesServices} from '@services/grales.service';
import {ApiService} from '@services/api.service';
import {registroDepto} from '@global/graphql/mutations/fragDepartamento.mutations';
import {Apollo} from 'apollo-angular';


@StateRepository()
@State<IDepartamento[]>({
    name: 'departamento',
    defaults: []
})
@Injectable()
export class DepartamentoState extends NgxsDataRepository<IDepartamento[]>
{

    constructor(private _deptoQuery: DeptoQueryService, private _deptoMutation: DeptoMutationService, private _apiService: ApiService,
                private _apollo: Apollo)
    {
        super();
    }

    @DataAction() agregarDepto(@Payload('departamento') departamento: IDepartamento): Observable<IResDepto>
    {

        return this._apiService.mutation(registroDepto, {departamento}, {}, ['data', 'registroDepto'], []).pipe(tap((res) =>
        {
            console.log('respuesta', res);
            // this.ctx.setState((state: IDepartamento[]): IDepartamento[] => state.concat(res.documento));
        }));


        // return this._deptoMutation.registroDepto(departamento).pipe(
        //     tap((dep: IResDepto) =>
        //     {
        //         this.ctx.setState((state: IDepartamento[]): IDepartamento[] => state.concat(dep.documento));
        //     }));
    }

    @DataAction() actualizarDepto(@Payload('actDepto') departamento: IDepartamento): Observable<IResDepto>
    {
        return this._deptoMutation.actualizarDepto(departamento).pipe(tap((dep: IResDepto) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(departamento._id, this.ctx).concat(dep.documento));
        }));
    }

    public listaDeptos(): Observable<IResDepto>
    {
        return this._deptoQuery.obtenerDeptos().pipe(tap((deptos: IResDepto): void =>
        {
            this.setState(deptos.documentos);
        }));
    }
}
