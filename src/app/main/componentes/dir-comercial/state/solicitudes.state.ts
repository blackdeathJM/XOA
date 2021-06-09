import {State} from '@ngxs/store';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {BehaviorSubject, Observable} from 'rxjs';
import {SolicitudServMutationService} from '@dir-comercial/solicitud-serv.mutation.service';
import {tap} from 'rxjs/operators';
import {SolicitudServQueryService} from '@dir-comercial/solicitud-serv.query.service';
import {GralesServices} from '@services/grales.service';

@StateRepository()
@State<ISolicitudServ[]>({name: 'SolicitudServicio', defaults: []})
@Injectable()
export class SolicitudesState extends NgxsDataRepository<ISolicitudServ[]>
{
    private solicitud$: BehaviorSubject<ISolicitudServ> = new BehaviorSubject<ISolicitudServ>(null);

    constructor(private _solicitudMutation: SolicitudServMutationService, private _solicitudQuery: SolicitudServQueryService)
    {
        super();
    }

    cargando = false;

    get gSolicituServ(): Observable<ISolicitudServ>
    {
        return this.solicitud$.asObservable();
    }

    set sSolicituServ(datos: ISolicitudServ)
    {
        this.solicitud$.next(datos);
    }

    @DataAction() regSolicitudServ(@Payload('Reg solicitud serv') solicitudServ: ISolicitudServ): Observable<IResSolicitud>
    {
        return this._solicitudMutation.regSolicitudServ(solicitudServ);
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

    @DataAction() aprovRechSolicitud(@Payload('Aprobar rechazar solicitud') _id: string, valor: boolean): Observable<IResSolicitud>
    {
        return this._solicitudMutation.aprovRechSolicitud(_id, valor).pipe(tap((res: IResSolicitud) =>
        {
            // this.ctx.setState(patch(updateItem((solicitud: ISolicitudServ) => solicitud._id === _id, res.documento)));
            this.ctx.setState(GralesServices.nvoEdoReem(_id, this.ctx, res.documento));
        }));
    }

    @DataAction() actualizarSolicitud(@Payload('Actualizar solicitud') _id: string, observaciones: string, aprobadoServ: boolean, ejecutadaPor: string): Observable<IResSolicitud>
    {
        return this._solicitudMutation.actualizarSolicitud(_id, observaciones, aprobadoServ, ejecutadaPor).pipe(tap((res: IResSolicitud) =>
        {
            this.ctx.setState(GralesServices.nvoEdoReem(_id, this.ctx, res.documento));
        }));
    }
}
