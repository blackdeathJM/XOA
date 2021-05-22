import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {catchError, pluck} from 'rxjs/operators';
import {DocumentNode} from 'graphql';
import {Observable, throwError} from 'rxjs';
import {GralesServices} from './grales.service';
import {RefetchQueryDescription} from '@apollo/client/core/watchQueryOptions';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    constructor(private _apollo: Apollo, private _serviciosGrales?: GralesServices)
    {
    }

    protected query(query: DocumentNode, variables = {}, context = {}, _pluck: string[] = []): Observable<any>
    {
        return this._apollo.watchQuery({
            query,
            variables,
            context,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(pluck(..._pluck));
    }

    protected consulta(query: DocumentNode, variables = {}, context = {}, _pluck: string[] = []): Observable<any>
    {
        return this._apollo.query(
            {query, variables, context, fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true}).pipe(pluck(..._pluck));
    }

    protected mutation(mutation: DocumentNode, variables = {}, context = {}, _pluck: string[] = [],
                       refetchQueries: RefetchQueryDescription = []): Observable<any>
    {
        return this._apollo.mutate({
            mutation,
            variables,
            context,
            refetchQueries
        }).pipe(
            catchError(err => throwError(err)),
            pluck(..._pluck)
        );
    }

    protected subscription(subscription: DocumentNode, variables = {}, context = {}, _pluck: string[] = []): Observable<any>
    {
        return this._apollo.subscribe({
            query: subscription,
            variables,
            context
        }).pipe(pluck(..._pluck));
    }
}
