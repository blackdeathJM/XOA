import {Injectable} from '@angular/core';
import {obtenerDeptos} from '../graphql/query/departamento.query';
import {Apollo} from 'apollo-angular';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import {IResDepto} from '../models/departamento.model';

@Injectable({
    providedIn: 'root'
})
export class DeptoQueryService extends ApiService
{
    constructor(_apollo: Apollo) {super(_apollo); }

    obtenerDeptos(): Observable<IResDepto>
    {
        return this.query(obtenerDeptos, {}, {}, ['data', 'obtenerDeptos']);
    }

}
