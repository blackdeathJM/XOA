import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {INotificacion, IResNotificacion} from '../models/notificacion.interface';
import {eliminarNotificacion, regNotificacion} from '../graphql/notificacion.mutation';

@Injectable({
    providedIn: 'root'
})
export class NotificacionMutationService extends ApiService
{

    constructor(_apollo: Apollo)
    {
        super(_apollo);
    }

    regNotificacion(notificacion: INotificacion): Observable<IResNotificacion>
    {
        return this.mutation(regNotificacion, {notificacion}, {}, ['data', 'regNotificacion'], []);
    }

    eliminarNotificacion(_id: string): Observable<IResNotificacion>
    {
        return this.mutation(eliminarNotificacion, {_id}, {}, ['data', 'eliminarNotificacion'], []);
    }
}
