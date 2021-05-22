import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {obtenerUsuarios} from '../graphql/query/usuario.query';
import {Router} from '@angular/router';
import {actualizarContrasena, actualizarRole, eliminarUsuario, registroUsuario} from '../graphql/mutation/usuario.mutation';
import {IResUsuario, IUsuario} from '../models/usuario.interface';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import {SesionState} from '@usuarios/state/sesion.state';

@Injectable({
    providedIn: 'root'
})
export class UsuarioMutationService extends ApiService
{
    constructor(_apollo: Apollo, private _router: Router, private _sesionState: SesionState)
    {
        super(_apollo);
    }

    registrarUsuario(usuario: IUsuario): Observable<IResUsuario>
    {
        return this.mutation(registroUsuario, {usuario}, {}, ['data', 'registroUsuario'], []);
    }

    eliminarUsuario(_id: string, pagina = 1, elementosPorPagina = 20): Observable<IResUsuario>
    {
        return this.mutation(eliminarUsuario, {_id}, {}, ['data', 'eliminarUsuario'],
            [{query: obtenerUsuarios, variables: {pagina, elementosPorPagina}}]);
    }

    actualizarRole(_id: string, role: string, esActualizar: boolean): Observable<IResUsuario>
    {
        return this.mutation(actualizarRole, {_id, role, esActualizar}, {}, ['data', 'actualizarRole'],
            []);
    }

    actualizarContrasena(actualContrasena: string, nvaContrasena: string, usuario: string, esAdmin: boolean): Observable<IResUsuario>
    {
        return this.mutation(actualizarContrasena, {
            usuario,
            actualContrasena,
            nvaContrasena,
            esAdmin
        }, {}, ['data', 'actualizarContrasena'], []);
    }
}
