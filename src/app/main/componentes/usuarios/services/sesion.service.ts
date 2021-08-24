import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ILoginToken, IUsuario} from '../models/usuario.interface';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {login} from '@usuarios/graphql/query/usuario.query';
import {GralesServices} from '@services/grales.service';
import {ApiService} from '@services/api.service';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Injectable({
    providedIn: 'root'
})
export class SesionService extends ApiService
{
    token = 'token';

    constructor(_apollo: Apollo, private http: HttpClient, private _router: Router, private _jwtHelperService: JwtHelperService,
                private _serviciosGenerales: GralesServices)
    {
        super(_apollo);
    }

    inicioSesion(usuario: string, contrasena: string): Observable<ILoginToken>
    {
        return this.consulta(login, {usuario, contrasena}, {}, ['data', 'login']);
    }

    obtenerSesionActual(): IUsuario
    {
        if (this._jwtHelperService.isTokenExpired())
        {
            this._router.navigateByUrl('seguridad/login').then(() =>
            {
                localStorage.removeItem(this.token);
                toastSweet(TipoAlerta.alerta, 'La sesion ha expirado, vuelve a iniciar sesion', 5000);
            });
        } else
        {
            // Decodificar token
            const tokenDecodificado = this._jwtHelperService.decodeToken().usuario.loginUsuario || this._jwtHelperService.decodeToken().usuario;
            if ('res' in tokenDecodificado)
            {
                return tokenDecodificado.res.documento;
            } else
            {
                return tokenDecodificado;
            }
        }
    }

    cerrarSesion(): void
    {
        this._router.navigate(['/seguridad/login']).then(() => localStorage.removeItem(this.token));
    }
}
