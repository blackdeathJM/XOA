import {DataAction, Payload, Persistence, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {ILoginToken, IUsuario} from '@modelosUsuarios/usuario.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {SesionService} from '@usuarios/sesion.service';
import {Observable} from 'rxjs';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {Router} from '@angular/router';
import {NgxsDataDoCheck} from '@ngxs-labs/data/typings';
import {TtlExpiredStrategy} from '@ngxs-labs/data/typings/storage/storage';
import {UsuarioSubscriptionService} from '@usuarios/usuario-subscription.service';

@Persistence({
    existingEngine: localStorage, ttlExpiredStrategy: TtlExpiredStrategy.REMOVE_KEY_AFTER_EXPIRED,
    path: 'usuario'
})
@StateRepository()
@State<IUsuario>({
    name: 'usuario', defaults: null
})
@Injectable()
export class SesionState extends NgxsDataRepository<IUsuario> implements NgxsDataDoCheck
{
    constructor(private _sesionService: SesionService, private _router: Router, private _usuarioSubscription: UsuarioSubscriptionService)
    {
        super();
    }

    @DataAction() iniciarSesion(@Payload('usuario') u: string, c: string): Observable<ILoginToken>
    {
        try
        {
            return this._sesionService.inicioSesion(u, c);
        } catch (e)
        {
            toastSweet(TipoAlerta.error, 'Error al tratar de iniciar sesion ' + e, 5000);
        }
    }

    public establecerEdoUsuario(usuario: IUsuario): void
    {
        this.ctx.setState(usuario);
    }

    obtenerSesion(): IUsuario
    {
        const nvaSession = this._sesionService.obtenerSesionActual();
        return nvaSession;
    }

    cerrarSesion(): void
    {
        this._sesionService.cerrarSesion();
    }

    ngxsDataDoCheck(): void
    {
        if (this.obtenerSesion())
        {
            this.ctx.setState(this.obtenerSesion());
        }
    }
}
