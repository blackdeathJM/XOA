import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResDocEx} from '../../../../direccion/documentos/models/docExt.interface';
import {busquedaGralUsuario, docsPendFolIntExt, docUsuarioExtEntregado, docUsuarioTipoDoc, usuarioSubproceso} from '../graphql/docsUsuario.query';

@Injectable({
    providedIn: 'root'
})
export class DocsUsuarioQueryService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    listarDocsPorUsuarioSubproceso(usuario: string, subprocesos: string[]): Observable<IResDocEx>
    {
        return this.consulta(usuarioSubproceso, {usuario, subprocesos}, {}, ['data', 'usuarioSubproceso']);
    }

    docsPendFolIntExt(usuarioFolio: string): Observable<IResDocEx>
    {
        return this.consulta(docsPendFolIntExt, {usuarioFolio}, {}, ['data', 'docsPendFolIntExt']);
    }

    busquedaGralUsuario(usuario: string, consulta: string): Observable<IResDocEx>
    {
        return this.consulta(busquedaGralUsuario, {usuario, consulta}, {}, ['data', 'busquedaGralUsuario']);
    }

    docUsuarioTipoDoc(usuarioFolio: string, tipoDoc: string): Observable<IResDocEx>
    {
        return this.consulta(docUsuarioTipoDoc, {usuarioFolio, tipoDoc}, {}, ['data', 'docUsuarioTipoDoc']);
    }

    docUsuarioExtEntregado(usuarioFolio: string): Observable<IResDocEx>
    {
        return this.consulta(docUsuarioExtEntregado, {usuarioFolio}, {}, ['data', 'docUsuarioExtEntregado']);
    }
}
