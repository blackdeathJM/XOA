import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import {IDocExt} from '../models/docExt.interface';
import {todosDocsExtSub} from '../graphql/docExt.subscription';

@Injectable({
    providedIn: 'root'
})
export class DocExtSubscriptionService extends ApiService
{
    constructor(_apollo: Apollo)
    {
        super(_apollo);
    }

    todosDocsExtSub(): Observable<IDocExt[]>
    {
        return this.subscription(todosDocsExtSub, {}, {}, ['data', 'todosDocsExtSub']);
    }
}
