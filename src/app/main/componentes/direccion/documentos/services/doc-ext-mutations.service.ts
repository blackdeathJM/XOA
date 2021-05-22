import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {IDocExt, IResDocEx} from '../models/docExt.interface';
import {Observable} from 'rxjs';
import {acDarPorEntregado, acInfoDoc, aprobarRechazarDoc, desactivarNot, quitarUsuario, regDocExt} from '../graphql/docExt.mutation';
import {ApiService} from '@services/api.service';

@Injectable({
    providedIn: 'root'
})
export class DocExtMutationsService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    // Registrar documento y subir archivo
    regDocExt(docExt: IDocExt): Observable<IResDocEx>
    {
        // {headers: new HttpHeaders().set('context', JSON.stringify(subPro))},
        return this.mutation(regDocExt, {docExt}, {}, ['data', 'regDocExt'], []);
    }

    desactivarNot(_id: string, usuario: string): Observable<IResDocEx>
    {
        return this.mutation(desactivarNot, {_id, usuario}, {}, ['data', 'desactivarNot'], []);
    }

    aprobarRechazarDoc(_id: string, usuario: string, subproceso: string, observaciones: string): Observable<IResDocEx>
    {
        return this.mutation(aprobarRechazarDoc, {
                _id,
                usuario,
                subproceso,
                observaciones
            },
            {}, ['data', 'aprobarRechazarDoc'], []);
    }

    acDarPorEntregado(_id: string): Observable<IResDocEx>
    {
        return this.mutation(acDarPorEntregado, {_id}, {}, ['data', 'acDarPorEntregado'], []);
    }

    acInfoDoc(documento: IDocExt): Observable<IResDocEx>
    {
        return this.mutation(acInfoDoc, {documento}, {}, ['data', 'acInfoDoc'], []);
    }

    quitarUsuario(_id: string, usuarioDestino: string): Observable<IResDocEx>
    {
        return this.mutation(quitarUsuario, {_id, usuarioDestino}, {}, ['data', 'quitarUsuario'], []);
    }
}
