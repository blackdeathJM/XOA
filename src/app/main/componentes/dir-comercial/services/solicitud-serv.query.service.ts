import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResSolicitud} from '@dir-comercial/solicitudServ.interface';
import {solPorCliente} from '@dir-comercial/query/solicitudesServ.query';

@Injectable({
    providedIn: 'root'
})
export class SolicitudServQueryService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    solPorCliente(idCliente: string): Observable<IResSolicitud>
    {
        return this.consulta(solPorCliente, {idCliente}, {}, ['data', 'solPorCliente']);
    }
}
