import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {INotificacion, IResNotificacion} from '../models/notificacion.interface';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {NotificacionSubscriptionService} from '../services/notificacion.subscription.service';
import {NotificacionMutationService} from '../services/notificacion.mutation.service';
import {SesionState} from '@usuarios/state/sesion.state';
import {NotificacionQueryService} from '../services/notificacion.query.service';
import {tap} from 'rxjs/operators';

@StateRepository()
@State<INotificacion[]>({name: 'notificacion', defaults: []})
@Injectable()
export class NotificarState extends NgxsDataRepository<INotificacion[]>
{
    constructor(private _notSubscription: NotificacionSubscriptionService, private notMutation: NotificacionMutationService, private _sesionState: SesionState,
                private _notQuery: NotificacionQueryService)
    {
        super();
    }

    @DataAction() agregarNot(@Payload('agregar notificacion') notificacion: INotificacion): Observable<IResNotificacion>
    {
        try
        {
            return this.notMutation.regNotificacion(notificacion);
        } catch (e)
        {
            toastSweet(TipoAlerta.error, 'Ocurrio un error inesperado: ' + e, 5000);
        }
    }

    @DataAction() eliminarNotificacion(@Payload('Eliminar notificacino') _id: string): Observable<IResNotificacion>
    {
        try
        {
            return this.notMutation.eliminarNotificacion(_id).pipe(tap((res: IResNotificacion) =>
            {
                if (res.estatus)
                {
                    this.ctx.setState((state: INotificacion[]): INotificacion[] =>
                        state.filter((not: INotificacion): boolean => not._id !== _id));
                }
            }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, 'Error inesperado: ' + e, 5000);
        }
    }

    @DataAction() subNot(): Observable<INotificacion[]>
    {
        try
        {
            return this._notSubscription.notificar(this._sesionState.snapshot.usuario).pipe(tap((not: INotificacion[]) =>
            {
                this.ctx.setState(not);
            }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, 'Error en subscripcion: ' + e, 5000);
        }
    }

    public listarNotificaciones(): Observable<IResNotificacion>
    {
        try
        {
            return this._notQuery.listarNotificaciones(this._sesionState.snapshot.usuario).pipe(tap((not: IResNotificacion) =>
            {
                this.setState(not.documentos);
            }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, 'Error al obtener las notificaciones: ' + e, 5000);
        }
    }
}
