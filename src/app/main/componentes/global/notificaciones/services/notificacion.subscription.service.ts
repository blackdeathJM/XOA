import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {INotificacion} from '../models/notificacion.interface';
import {notificar} from '../graphql/notificacion.subscription';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificacionSubscriptionService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    notificar(receptor: string): Observable<INotificacion[]>
    {
        return this.subscription(notificar, {receptor}, {}, ['data', 'notificar']);
    }
}
