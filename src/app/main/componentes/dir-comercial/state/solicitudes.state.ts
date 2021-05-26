import {State} from '@ngxs/store';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {Observable} from 'rxjs';
import {SolicitudServMutationService} from '@dir-comercial/solicitud-serv.mutation.service';
import {tap} from 'rxjs/operators';

@StateRepository()
@State<ISolicitudServ[]>({name: 'SolicitudServicio', defaults: []})
@Injectable()
export class SolicitudesState extends NgxsDataRepository<ISolicitudServ[]>
{
    constructor(private _solicitudMutation: SolicitudServMutationService)
    {
        super();
    }

    @DataAction() regSolicitudServ(@Payload('Reg solicitud serv') idCliente: string, solicitudServ: ISolicitudServ): Observable<IResSolicitud>
    {
        return this._solicitudMutation.regSolicitudServ(idCliente, solicitudServ).pipe(tap((res: IResSolicitud) =>
        {
            this.ctx.setState((state: ISolicitudServ[]): ISolicitudServ[] => state.concat(res.documentos));
        }));
    }
}
