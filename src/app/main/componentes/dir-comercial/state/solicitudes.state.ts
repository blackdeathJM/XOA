import {State} from '@ngxs/store';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {Observable} from 'rxjs';
import {SolicitudServMutationService} from '@dir-comercial/solicitud-serv.mutation.service';
import {tap} from 'rxjs/operators';
import {SolicitudServQueryService} from '@dir-comercial/solicitud-serv.query.service';

@StateRepository()
@State<ISolicitudServ[]>({name: 'SolicitudServicio', defaults: []})
@Injectable()
export class SolicitudesState extends NgxsDataRepository<ISolicitudServ[]>
{
    constructor(private _solicitudMutation: SolicitudServMutationService, private _solicitudQuery: SolicitudServQueryService)
    {
        super();
    }

    cargando = false;

    @DataAction() regSolicitudServ(@Payload('Reg solicitud serv') solicitudServ: ISolicitudServ): Observable<IResSolicitud>
    {
        return this._solicitudMutation.regSolicitudServ(solicitudServ).pipe(tap((res: IResSolicitud) =>
        {
            this.ctx.setState((state: ISolicitudServ[]): ISolicitudServ[] => state.concat(res.documento));
        }));
    }

    @DataAction() solPorCliente(@Payload('Solicitudes por cliente') idCliente: string): Observable<IResSolicitud>
    {
        this.cargando = true;
        return this._solicitudQuery.solPorCliente(idCliente).pipe(tap((res: IResSolicitud) =>
        {
            if (res.documentos.length > 0 || res.documentos)
            {
                this.ctx.setState(res.documentos);
                this.cargando = false;
            }
        }));
    }
}
