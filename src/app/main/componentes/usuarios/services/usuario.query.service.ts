import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {obtenerUsuarios} from '../graphql/query/usuario.query';
import {ApiService} from '@services/api.service';
import {Observable} from 'rxjs';
import {IResUsuario} from '@modelosUsuarios/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class UsuarioQueryService extends ApiService
{
    constructor(_apollo: Apollo)
    {
        super(_apollo);
    }

    obTodosUsuarios(): Observable<IResUsuario>
    {
        return this.consulta(obtenerUsuarios, {}, {}, ['data', 'obtenerUsuarios']);
    }
}
