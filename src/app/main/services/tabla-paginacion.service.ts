import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';

@Injectable({
    providedIn: 'root'
})
export class TablaPaginacionService extends ApiService
{
    constructor(_apollo: Apollo)
    {
        super(_apollo);
    }

    obtenerListaDocumentos(query: DocumentNode, variables = {}, context = {}, _pluck: string[]): any
    {
        return this.query(query, variables, context, _pluck);
    }
}

