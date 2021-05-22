import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IDocExt, IResDocEx} from '../../../../direccion/documentos/models/docExt.interface';
import {acAcuse, acDocUrlEnUsuarioDestino, asigElfolioPorTipoDoc, docRespUrlAcuseUrl, genFolioRespDoc, terminarDocUsuario} from '../graphql/docsUsuario.mutation';

@Injectable({
    providedIn: 'root'
})
export class DocsUsuarioMutationService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    acDocUrlEnUsuarioDestino(_id: string, usuario: string, docUrl: string, subproceso: string): Observable<IResDocEx>
    {
        return this.mutation(acDocUrlEnUsuarioDestino, {_id, usuario, docUrl, subproceso}, {},
            ['data', 'acDocUrlEnUsuarioDestino'], []);
    }

    asigElfolioPorTipoDoc(documento: IDocExt, refDoc: number): Observable<IResDocEx>
    {
        return this.mutation(asigElfolioPorTipoDoc, {documento, refDoc}, {}, ['data', 'asigElfolioPorTipoDoc'],
            []);
    }

    genFolioRespDoc(_id: string, usuario: string, centroGestor: string): Observable<IResDocEx>
    {
        return this.mutation(genFolioRespDoc, {_id, usuario, centroGestor}, {}, ['data', 'genFolioRespDoc'], []);
    }

    docRespUrlAcuseUrl(_id: string, documento: string, proceso: string, usuario: string, esInterno: boolean, esDocRespUrl: boolean): Observable<IResDocEx>
    {
        return this.mutation(docRespUrlAcuseUrl, {_id, documento, proceso, usuario, esInterno, esDocRespUrl}, {},
            ['data', 'docRespUrlAcuseUrl'], []);
    }

    acAcuse(_id: string, acuseUrl: string, proceso: string, usuario: string): Observable<IResDocEx>
    {
        return this.mutation(acAcuse, {_id, acuseUrl, proceso, usuario}, {}, ['data', 'acAcuse'], []);
    }

    terminarDocUsuario(_id: string): Observable<IResDocEx>
    {
        return this.mutation(terminarDocUsuario, {_id}, {}, ['data', 'terminarDocUsuario'], []);
    }
}
