import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {actualizarSolicitud, aprovRechSolicitud, regSolicitudServ} from '@dir-comercial/mutations/solicitudServ.mutation';

@Injectable({
    providedIn: 'root'
})
export class SolicitudServMutationService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    regSolicitudServ(solicitudServ: ISolicitudServ): Observable<IResSolicitud>
    {
        return this.mutation(regSolicitudServ, {solicitudServ}, {}, ['data', 'regSolicitudServ']);
    }

    aprovRechSolicitud(_id: string, valor: boolean): Observable<IResSolicitud>
    {
        return this.mutation(aprovRechSolicitud, {_id, valor}, {}, ['data', 'aprovRechSolicitud']);
    }

    actualizarSolicitud(_id: string, observaciones: string, aprobadoServ: boolean, ejecutadaPor: string): Observable<IResSolicitud>
    {
        return this.mutation(actualizarSolicitud, {_id, observaciones, aprobadoServ, ejecutadaPor}, {}, ['data', 'actualizarSolicitud']);
    }
}
