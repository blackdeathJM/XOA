import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {cambiarRoleUsuario} from '@usuarios/graphql/subscriptions/usuario.subscription';
import {ICambioRol} from '@modelosUsuarios/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class UsuarioSubscriptionService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    cambiarRoleUsuario(usuario: string): Observable<ICambioRol>
    {
        return this.subscription(cambiarRoleUsuario, {usuario}, {}, ['data', 'cambiarRoleUsuario']);
    }
}
