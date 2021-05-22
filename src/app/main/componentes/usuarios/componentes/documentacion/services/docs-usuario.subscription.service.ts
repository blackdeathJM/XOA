import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IDocExt} from '../../../../direccion/documentos/models/docExt.interface';
import { docSubProceso } from 'app/main/componentes/direccion/documentos/graphql/docExt.subscription';

@Injectable({
    providedIn: 'root'
})
export class DocsUsuarioSubscriptionService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    docSubProceso(usuario: string): Observable<IDocExt[]>
    {
        return this.subscription(docSubProceso, {usuario}, {}, ['data', 'docSubProceso']);
    }
}
