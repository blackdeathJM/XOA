import {Injectable} from '@angular/core';
import {ApiService} from '@services/api.service';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {IResNotificacion} from '../models/notificacion.interface';
import {listarNotificaciones} from '../graphql/notificar.query';

@Injectable({
    providedIn: 'root'
})
export class NotificacionQueryService extends ApiService
{

    constructor(_apollo: Apollo)
    {
        super(_apollo);
    }

    listarNotificaciones(receptor: string): Observable<IResNotificacion>
    {
        return this.query(listarNotificaciones, {receptor}, {}, ['data', 'listarNotificaciones']);
    }
}
