import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {IResUsuario, IUsuario} from '@modelosUsuarios/usuario.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {UsuarioQueryService} from '@usuarios/usuario.query.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {UsuarioMutationService} from '@usuarios/usuario.mutation.service';
import {GralesServices} from '@services/grales.service';

@StateRepository()
@State<IUsuario[]>({name: 'usuarios', defaults: []})
@Injectable()
export class AdmonUsuariosState extends NgxsDataRepository<IUsuario[]>
{
    constructor(private _usuarioQuery: UsuarioQueryService, private _usuarioMutation: UsuarioMutationService)
    {
        super();
    }

    @DataAction() regUsuario(@Payload('Registrar usuario') usuario: IUsuario): Observable<IResUsuario>
    {
        return this._usuarioMutation.registrarUsuario(usuario).pipe(tap((res: IResUsuario) =>
            this.ctx.setState((state: IUsuario[]): IUsuario[] => state.concat(res.documento))));
    }

    @DataAction() actualizarRole(@Payload('Actualizar rol') _id: string, role: string, esActualizar: boolean): Observable<IResUsuario>
    {
        return this._usuarioMutation.actualizarRole(_id, role, esActualizar).pipe(tap((res: IResUsuario) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }), catchError(err =>
        {
            toastSweet(TipoAlerta.error, err, 5000);
            return of([]);
        }));
    }

    @DataAction() actualizarContrasena(@Payload('Actualizar contrasena') actualContrasena: string, nvaContrasena: string,
                                       usuario: string, esAdmin: boolean): Observable<IResUsuario>
    {
        return this._usuarioMutation.actualizarContrasena(actualContrasena, nvaContrasena, usuario, esAdmin)
            .pipe(catchError(err =>
            {
                toastSweet(TipoAlerta.error, err, 5000);
                return of([]);
            }));
    }

    public cargarUsuarios(): Observable<IResUsuario>
    {
        return this._usuarioQuery.obTodosUsuarios().pipe(tap((res: IResUsuario) =>
        {
            this.setState(res.documentos);
        }), catchError(err =>
        {
            toastSweet(TipoAlerta.error, err, 5000);
            return of([]);
        }));
    }
}
