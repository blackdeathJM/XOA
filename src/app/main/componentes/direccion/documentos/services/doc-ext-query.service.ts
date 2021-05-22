import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {busquedaGral, docExtProceso, docPorTipo, docsEntreFechas, intOExt, todosDocsExt, todosLosDocs, todosLosDocsPorUsuario, ultimoFolio}
    from '../graphql/docExt.query';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import {IResDocEx} from '../models/docExt.interface';

@Injectable({
    providedIn: 'root'
})
export class DocExtQueryService extends ApiService
{
    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    todosDocsExt(proceso: string): Observable<IResDocEx>
    {
        return this.consulta(todosDocsExt, {proceso}, {}, ['data', 'todosDocsExt']);
    }

    docExtProceso(proceso: string): Observable<IResDocEx>
    {
        return this.consulta(docExtProceso, {proceso}, {}, ['data', 'docExtProceso']);
    }

    todosLosDocsPorUsuario(usuario: string): Observable<IResDocEx>
    {
        return this.consulta(todosLosDocsPorUsuario, {usuario}, {}, ['data', 'todosLosDocsPorUsuario']);
    }

    docsEntreFechas(fechaRecepcionInicial: string, fechaRecepcionFinal: string): Observable<IResDocEx>
    {
        return this.consulta(docsEntreFechas, {fechaRecepcionInicial, fechaRecepcionFinal}, {}, ['data', 'docsEntreFechas']);
    }

    busquedaGral(consulta: string): Observable<IResDocEx>
    {
        return this.consulta(busquedaGral, {consulta}, {}, ['data', 'busquedaGral']);
    }

    docPorTipo(tipoDoc: string): Observable<IResDocEx>
    {
        return this.consulta(docPorTipo, {tipoDoc}, {}, ['data', 'docPorTipo']);
    }

    todosLosDocs(): Observable<IResDocEx>
    {
        return this.consulta(todosLosDocs, {}, {}, ['data', 'todosLosDocs']);
    }

    intOExt(esInterno: boolean): Observable<IResDocEx>
    {
        return this.consulta(intOExt, {esInterno}, {}, ['data', 'intOExt']);
    }

    ultimoFolio(): Observable<IResDocEx>
    {
        return this.consulta(ultimoFolio, {}, {}, ['data', 'ultimoFolio']);
    }
}
