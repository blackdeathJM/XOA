import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {regSolicitudServ} from '@dir-comercial/mutations/solicitudServ.mutation';

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
}
